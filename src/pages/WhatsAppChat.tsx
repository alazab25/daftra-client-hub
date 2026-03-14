import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Paperclip,
  Phone,
  MessageSquare,
  FileText,
  Image,
  X,
  CheckCheck,
  Clock,
  AlertCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ChatMessage {
  id: string;
  phone: string;
  direction: "outbound" | "inbound";
  message_type: string;
  content: string;
  template_key?: string;
  status: string;
  file_url?: string;
  created_at: string;
}

interface WhatsAppTemplate {
  id: string;
  template_key: string;
  template_name: string;
  body_text: string;
  variables: any;
  is_active: boolean;
}

const WhatsAppChat = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedPhone, setSelectedPhone] = useState("");
  const [messageText, setMessageText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateVars, setTemplateVars] = useState<string[]>([]);
  const [sendMode, setSendMode] = useState<"text" | "template">("text");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");

  // Fetch chat logs
  const { data: chatLogs = [], isLoading: logsLoading } = useQuery({
    queryKey: ["whatsapp-chat-logs"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("sync_logs")
        .select("*")
        .eq("sync_type", "whatsapp_send")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch templates
  const { data: templates = [] } = useQuery({
    queryKey: ["whatsapp-templates-active"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("notification_templates")
        .select("*")
        .eq("is_active", true)
        .order("template_name");
      if (error) throw error;
      return (data || []) as WhatsAppTemplate[];
    },
  });

  // Get unique phone numbers from logs
  const phoneNumbers = Array.from(
    new Set(
      chatLogs
        .filter((log: any) => log.sync_details?.phone)
        .map((log: any) => log.sync_details.phone)
    )
  ) as string[];

  // Filter messages for selected phone
  const currentMessages = chatLogs.filter(
    (log: any) => log.sync_details?.phone === selectedPhone
  );

  const handleSendMessage = async () => {
    if (!selectedPhone) {
      toast({ title: "خطأ", description: "يرجى اختيار رقم هاتف", variant: "destructive" });
      return;
    }

    setIsSending(true);

    try {
      // Upload file to Seafile if attached
      let fileUrl: string | undefined;
      if (attachedFile) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(attachedFile);
        });

        const { data: uploadData, error: uploadError } = await supabase.functions.invoke(
          "upload-to-seafile",
          {
            body: {
              file_base64: base64,
              file_name: `${Date.now()}-${attachedFile.name}`,
              parent_dir: `/whatsapp-files/${selectedPhone}`,
            },
          }
        );

        if (uploadError) throw uploadError;
        fileUrl = uploadData?.file_link;
        
        toast({ title: "تم رفع الملف", description: `تم حفظ ${attachedFile.name} في Seafile` });
      }

      if (sendMode === "template" && selectedTemplate) {
        // Send template message
        const { data, error } = await supabase.functions.invoke("send-whatsapp", {
          body: {
            phone: selectedPhone,
            template_key: selectedTemplate,
            variables: templateVars,
          },
        });

        if (error) throw error;
        toast({ title: "تم الإرسال", description: "تم إرسال رسالة القالب بنجاح" });
      } else if (sendMode === "text" && messageText.trim()) {
        // Send text message via WhatsApp API directly
        const { data, error } = await supabase.functions.invoke("send-whatsapp-text", {
          body: {
            phone: selectedPhone,
            message: messageText + (fileUrl ? `\n\n📎 ملف مرفق: ${fileUrl}` : ""),
          },
        });

        if (error) throw error;
        toast({ title: "تم الإرسال", description: "تم إرسال الرسالة بنجاح" });
      }

      // Reset
      setMessageText("");
      setAttachedFile(null);
      setTemplateVars([]);
      queryClient.invalidateQueries({ queryKey: ["whatsapp-chat-logs"] });
    } catch (error: any) {
      console.error("Send error:", error);
      toast({
        title: "خطأ في الإرسال",
        description: error.message || "فشل إرسال الرسالة",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: "خطأ", description: "حجم الملف يتجاوز 10 ميجا", variant: "destructive" });
        return;
      }
      setAttachedFile(file);
    }
  };

  const handleTemplateChange = (templateKey: string) => {
    setSelectedTemplate(templateKey);
    const template = templates.find((t) => t.template_key === templateKey);
    if (template) {
      const vars = Array.isArray(template.variables) ? template.variables : [];
      setTemplateVars(new Array(vars.length).fill(""));
    }
  };

  const handleAddNewChat = () => {
    if (newPhone.trim()) {
      const formatted = newPhone.replace(/\s+/g, "").replace(/^0+/, "");
      setSelectedPhone(formatted.startsWith("20") ? formatted : "20" + formatted);
      setIsNewChatOpen(false);
      setNewPhone("");
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Contacts Sidebar */}
      <Card className="w-72 flex-shrink-0 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-success" />
              المحادثات
            </CardTitle>
            <Button size="sm" variant="outline" onClick={() => setIsNewChatOpen(true)}>
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-2 space-y-1">
          {phoneNumbers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              لا توجد محادثات
            </div>
          ) : (
            phoneNumbers.map((phone) => {
              const lastMsg = chatLogs.find(
                (l: any) => l.sync_details?.phone === phone
              );
              return (
                <button
                  key={phone}
                  onClick={() => setSelectedPhone(phone)}
                  className={`w-full text-right p-3 rounded-xl transition-all ${
                    selectedPhone === phone
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate" dir="ltr">
                        +{phone}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {lastMsg?.status === "completed" ? "✓ تم الإرسال" : "⏳ قيد الانتظار"}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col">
        {selectedPhone ? (
          <>
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground" dir="ltr">+{selectedPhone}</p>
                    <p className="text-xs text-muted-foreground">WhatsApp Business</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-success border-success/30">
                  متصل
                </Badge>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
              {currentMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>لا توجد رسائل بعد</p>
                    <p className="text-sm">أرسل رسالة للبدء</p>
                  </div>
                </div>
              ) : (
                currentMessages.reverse().map((msg: any) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[70%] bg-success/10 border border-success/20 rounded-2xl rounded-br-md px-4 py-2.5">
                      {msg.sync_details?.template_key && (
                        <p className="text-xs text-success font-medium mb-1">
                          📋 قالب: {msg.sync_details.template_key}
                        </p>
                      )}
                      <p className="text-sm text-foreground">
                        {msg.sync_details?.template_key
                          ? `رسالة قالب مرسلة`
                          : msg.sync_details?.message || "رسالة مرسلة"}
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(msg.created_at).toLocaleTimeString("ar-EG", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {msg.status === "completed" ? (
                          <CheckCheck className="w-3.5 h-3.5 text-success" />
                        ) : msg.status === "failed" ? (
                          <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </CardContent>

            {/* Input Area */}
            <div className="p-4 border-t border-border space-y-3">
              {/* Mode Selector */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={sendMode === "text" ? "default" : "outline"}
                  onClick={() => setSendMode("text")}
                >
                  رسالة نصية
                </Button>
                <Button
                  size="sm"
                  variant={sendMode === "template" ? "default" : "outline"}
                  onClick={() => setSendMode("template")}
                >
                  قالب
                </Button>
              </div>

              {sendMode === "template" ? (
                <div className="space-y-2">
                  <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر قالب الرسالة" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((t) => (
                        <SelectItem key={t.template_key} value={t.template_key}>
                          {t.template_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {templateVars.map((v, i) => (
                    <Input
                      key={i}
                      placeholder={`المتغير {{${i + 1}}}`}
                      value={v}
                      onChange={(e) => {
                        const newVars = [...templateVars];
                        newVars[i] = e.target.value;
                        setTemplateVars(newVars);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <Textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="اكتب رسالة..."
                      rows={2}
                      className="resize-none pr-10"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute left-2 bottom-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              )}

              {/* Attached file indicator */}
              {attachedFile && (
                <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm flex-1 truncate">{attachedFile.name}</span>
                  <button onClick={() => setAttachedFile(null)}>
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              )}

              <Button
                className="w-full gap-2 bg-success hover:bg-success/90 text-white"
                onClick={handleSendMessage}
                disabled={isSending || (!messageText.trim() && !selectedTemplate)}
              >
                {isSending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSending ? "جارٍ الإرسال..." : "إرسال"}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/5 flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-success/30" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">مراسلات WhatsApp</h3>
              <p className="text-sm">اختر محادثة أو ابدأ محادثة جديدة</p>
            </div>
          </div>
        )}
      </Card>

      {/* New Chat Dialog */}
      <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>محادثة جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>رقم الهاتف</Label>
              <Input
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="01xxxxxxxxx"
                dir="ltr"
                className="text-left"
              />
              <p className="text-xs text-muted-foreground">
                سيتم تنسيق الرقم تلقائياً بكود مصر (+20)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewChatOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddNewChat} className="bg-success hover:bg-success/90 text-white">
              بدء المحادثة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WhatsAppChat;
