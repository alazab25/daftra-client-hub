import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  Clock, 
  X,
  Send,
  Copy,
  Eye,
  AlertCircle,
  FileText
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Template {
  id: string;
  template_key: string;
  template_name: string;
  header_text: string | null;
  body_text: string;
  footer_text: string | null;
  buttons: any;
  variables: any;
  language: string | null;
  event_type: string | null;
  is_active: boolean;
  created_at: string;
}

const eventTypeLabels: Record<string, string> = {
  invoice_issued: "إصدار فاتورة",
  order_status_changed: "تغيير حالة الطلب",
  technician_assigned: "تعيين فني",
  payment_confirmed: "تأكيد الدفع",
  appointment_scheduled: "جدولة موعد",
};

const WhatsAppTemplates = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    template_key: "",
    template_name: "",
    header_text: "",
    body_text: "",
    footer_text: "",
    language: "ar",
    event_type: "",
    variables: [] as string[],
  });

  // Fetch templates
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["whatsapp-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notification_templates")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Template[];
    },
  });

  // Create/Update template mutation
  const saveTemplateMutation = useMutation({
    mutationFn: async (data: Partial<Template>) => {
      const validEventTypes = ["invoice_issued", "order_status_changed", "technician_assigned", "payment_confirmed", "appointment_scheduled"] as const;
      const eventType = data.event_type && validEventTypes.includes(data.event_type as any) 
        ? (data.event_type as typeof validEventTypes[number]) 
        : null;

      if (editingTemplate) {
        const { error } = await supabase
          .from("notification_templates")
          .update({
            template_key: data.template_key,
            template_name: data.template_name,
            header_text: data.header_text || null,
            body_text: data.body_text,
            footer_text: data.footer_text || null,
            language: data.language,
            event_type: eventType,
            variables: data.variables || [],
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingTemplate.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("notification_templates")
          .insert([{
            template_key: data.template_key!,
            template_name: data.template_name!,
            header_text: data.header_text || null,
            body_text: data.body_text!,
            footer_text: data.footer_text || null,
            language: data.language,
            event_type: eventType,
            variables: data.variables || [],
            buttons: [],
            is_active: true,
          }]);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-templates"] });
      toast({
        title: editingTemplate ? "تم التحديث" : "تم الإنشاء",
        description: editingTemplate 
          ? "تم تحديث القالب بنجاح" 
          : "تم إنشاء القالب بنجاح. يرجى إرساله لـ Meta للموافقة.",
      });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ القالب",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  // Delete template mutation
  const deleteTemplateMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("notification_templates")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-templates"] });
      toast({
        title: "تم الحذف",
        description: "تم حذف القالب بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف القالب",
        variant: "destructive",
      });
    },
  });

  // Toggle template status
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("notification_templates")
        .update({ is_active, updated_at: new Date().toISOString() })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-templates"] });
      toast({
        title: "تم التحديث",
        description: "تم تحديث حالة القالب",
      });
    },
  });

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTemplate(null);
    setFormData({
      template_key: "",
      template_name: "",
      header_text: "",
      body_text: "",
      footer_text: "",
      language: "ar",
      event_type: "",
      variables: [],
    });
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setFormData({
      template_key: template.template_key,
      template_name: template.template_name,
      header_text: template.header_text || "",
      body_text: template.body_text,
      footer_text: template.footer_text || "",
      language: template.language || "ar",
      event_type: template.event_type || "",
      variables: Array.isArray(template.variables) ? template.variables : [],
    });
    setIsDialogOpen(true);
  };

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.template_key || !formData.template_name || !formData.body_text) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Extract variables from body text
    const variableMatches = formData.body_text.match(/\{\{(\d+)\}\}/g) || [];
    const variables = variableMatches.map(v => v.replace(/\{\{|\}\}/g, ''));

    saveTemplateMutation.mutate({
      ...formData,
      variables,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "تم النسخ",
      description: "تم نسخ النص للحافظة",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 rounded-xl bg-success/10">
              <MessageSquare className="w-6 h-6 text-success" />
            </div>
            قوالب WhatsApp
          </h1>
          <p className="text-muted-foreground mt-1">
            إدارة قوالب رسائل WhatsApp Business API
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary gap-2">
              <Plus className="w-4 h-4" />
              قالب جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? "تعديل القالب" : "إنشاء قالب جديد"}
              </DialogTitle>
              <DialogDescription>
                قم بإنشاء قالب رسالة WhatsApp. يجب إرسال القالب لـ Meta للموافقة عليه قبل استخدامه.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>ملاحظة هامة</AlertTitle>
                <AlertDescription>
                  قوالب WhatsApp تحتاج موافقة من Meta قبل استخدامها. 
                  استخدم المتغيرات بصيغة {"{{1}}"}, {"{{2}}"} وهكذا.
                </AlertDescription>
              </Alert>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>مفتاح القالب *</Label>
                  <Input
                    value={formData.template_key}
                    onChange={(e) => setFormData({ ...formData, template_key: e.target.value.toLowerCase().replace(/\s/g, '_') })}
                    placeholder="مثال: document_review_request"
                    dir="ltr"
                    className="text-left"
                  />
                  <p className="text-xs text-muted-foreground">
                    يجب أن يتطابق مع اسم القالب في Meta
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>اسم القالب *</Label>
                  <Input
                    value={formData.template_name}
                    onChange={(e) => setFormData({ ...formData, template_name: e.target.value })}
                    placeholder="طلب مراجعة مستند"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اللغة</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>نوع الحدث</Label>
                  <Select
                    value={formData.event_type}
                    onValueChange={(value) => setFormData({ ...formData, event_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الحدث" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(eventTypeLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>العنوان (Header)</Label>
                <Input
                  value={formData.header_text}
                  onChange={(e) => setFormData({ ...formData, header_text: e.target.value })}
                  placeholder="عنوان الرسالة (اختياري)"
                />
              </div>

              <div className="space-y-2">
                <Label>نص الرسالة *</Label>
                <Textarea
                  value={formData.body_text}
                  onChange={(e) => setFormData({ ...formData, body_text: e.target.value })}
                  placeholder={`مثال:\nمرحباً {{1}}،\n\nيوجد مستند جديد بعنوان "{{2}}" يتطلب مراجعتك.\n\nيرجى الدخول للنظام لمراجعته.`}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  استخدم {"{{1}}"}, {"{{2}}"} للمتغيرات
                </p>
              </div>

              <div className="space-y-2">
                <Label>التذييل (Footer)</Label>
                <Input
                  value={formData.footer_text}
                  onChange={(e) => setFormData({ ...formData, footer_text: e.target.value })}
                  placeholder="نص التذييل (اختياري)"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                إلغاء
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={saveTemplateMutation.isPending}
                className="gradient-primary"
              >
                {saveTemplateMutation.isPending ? "جارٍ الحفظ..." : "حفظ القالب"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Card */}
      <Card className="border-info/20 bg-info/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-info mt-0.5" />
            <div>
              <p className="font-medium text-foreground">كيفية استخدام القوالب</p>
              <p className="text-sm text-muted-foreground mt-1">
                1. أنشئ القالب هنا بنفس الصيغة المطلوبة من Meta<br/>
                2. أرسل القالب للموافقة عبر{" "}
                <a 
                  href="https://business.facebook.com/latest/whatsapp_manager/message_templates" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  لوحة تحكم WhatsApp Business
                </a><br/>
                3. بعد الموافقة، قم بتفعيل القالب هنا لاستخدامه
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Table */}
      <Card>
        <CardHeader>
          <CardTitle>القوالب المتاحة</CardTitle>
          <CardDescription>
            {templates.length} قالب مسجل
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">لا توجد قوالب بعد</p>
              <p className="text-sm text-muted-foreground">
                قم بإنشاء قالب جديد للبدء
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>القالب</TableHead>
                    <TableHead>المفتاح</TableHead>
                    <TableHead>نوع الحدث</TableHead>
                    <TableHead>اللغة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{template.template_name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {template.body_text.substring(0, 50)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {template.template_key}
                        </code>
                      </TableCell>
                      <TableCell>
                        {template.event_type ? (
                          <Badge variant="outline">
                            {eventTypeLabels[template.event_type] || template.event_type}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {template.language === "ar" ? "العربية" : "English"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={template.is_active ? "default" : "secondary"}
                          className={template.is_active ? "bg-success" : ""}
                        >
                          {template.is_active ? (
                            <>
                              <Check className="w-3 h-3 ml-1" />
                              مفعّل
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 ml-1" />
                              معطّل
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePreview(template)}
                            title="معاينة"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(template.template_key)}
                            title="نسخ المفتاح"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(template)}
                            title="تعديل"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleStatusMutation.mutate({ 
                              id: template.id, 
                              is_active: !template.is_active 
                            })}
                            title={template.is_active ? "تعطيل" : "تفعيل"}
                          >
                            {template.is_active ? (
                              <X className="w-4 h-4 text-warning" />
                            ) : (
                              <Check className="w-4 h-4 text-success" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTemplateMutation.mutate(template.id)}
                            title="حذف"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>معاينة القالب</DialogTitle>
          </DialogHeader>
          {previewTemplate && (
            <div className="bg-[#e5ddd5] p-4 rounded-lg">
              <div className="bg-white rounded-lg p-3 shadow max-w-[80%] mr-auto">
                {previewTemplate.header_text && (
                  <p className="font-bold text-sm mb-2">{previewTemplate.header_text}</p>
                )}
                <p className="text-sm whitespace-pre-wrap">
                  {previewTemplate.body_text}
                </p>
                {previewTemplate.footer_text && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {previewTemplate.footer_text}
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-left mt-2">
                  {new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WhatsAppTemplates;
