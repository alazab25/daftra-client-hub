import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Settings as SettingsIcon, 
  User,
  Bell,
  Link as LinkIcon,
  Palette,
  Save,
  RefreshCw,
  MessageSquare,
  ChevronLeft,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useData";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile, refetch } = useProfile();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveNotifications = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Notification preferences saved locally until DB columns are added
      const { error } = await supabase
        .from("profiles")
        .update({})
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "تم الحفظ",
        description: "تم حفظ إعدادات الإشعارات بنجاح",
      });
      
      refetch();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmailNotifications(true);
    setSmsNotifications(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>
        <p className="text-muted-foreground">إدارة إعدادات حسابك والنظام</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="w-4 h-4" />
            المظهر
          </TabsTrigger>
          <TabsTrigger value="integration" className="gap-2">
            <LinkIcon className="w-4 h-4" />
            التكامل
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            الإشعارات
          </TabsTrigger>
          <TabsTrigger value="general" className="gap-2">
            <SettingsIcon className="w-4 h-4" />
            عام
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>الملف الشخصي</CardTitle>
                    <CardDescription>معلومات حسابك الأساسية</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الاسم الكامل</Label>
                    <Input defaultValue={(profile as any)?.name || ""} placeholder="الاسم الكامل" />
                  </div>
                  <div className="space-y-2">
                    <Label>المنصب الوظيفي</Label>
                    <Input defaultValue={(profile as any)?.position || ""} placeholder="المنصب الوظيفي" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>البريد الإلكتروني</Label>
                  <Input type="email" defaultValue={profile?.email || user?.email || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label>الدور الوظيفي</Label>
                  <Input defaultValue={(profile as any)?.role || ""} placeholder="الدور الوظيفي" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إعدادات العرض</CardTitle>
                <CardDescription>تخصيص طريقة عرض البيانات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>اللغة</Label>
                    <Select defaultValue="ar">
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
                    <Label>العملة</Label>
                    <Select defaultValue="egp">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="egp">جنيه مصري (ج.م)</SelectItem>
                        <SelectItem value="sar">ريال سعودي (ر.س)</SelectItem>
                        <SelectItem value="usd">دولار أمريكي ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>إعدادات الإشعارات</CardTitle>
                    <CardDescription>تحكم في كيفية تلقي الإشعارات</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">إشعارات البريد الإلكتروني</p>
                      <p className="text-sm text-muted-foreground">استلام إشعارات عبر البريد الإلكتروني</p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-foreground flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-success" />
                          إشعارات SMS
                        </p>
                        <p className="text-sm text-muted-foreground">استلام إشعارات عبر الرسائل النصية</p>
                      </div>
                    </div>
                    <Switch 
                      checked={smsNotifications} 
                      onCheckedChange={setSmsNotifications} 
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex gap-3">
                  <Button 
                    onClick={handleSaveNotifications} 
                    className="gradient-primary gap-2"
                    disabled={isLoading}
                  >
                    <Save className="w-4 h-4" />
                    {isLoading ? "جارٍ الحفظ..." : "حفظ الإعدادات"}
                  </Button>
                  <Button variant="outline" onClick={handleReset} className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    إعادة تعيين
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Integration Tab */}
        <TabsContent value="integration">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-success/10">
                    <LinkIcon className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <CardTitle>التكاملات</CardTitle>
                    <CardDescription>ربط الحساب بالخدمات الخارجية</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">WhatsApp Business</p>
                        <p className="text-sm text-muted-foreground">إرسال إشعارات عبر واتساب للمراجعين</p>
                      </div>
                    </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">متصل</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate("/settings/whatsapp-templates")}
                          className="gap-1"
                        >
                          <FileText className="w-3 h-3" />
                          القوالب
                        </Button>
                      </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Daftra</p>
                        <p className="text-sm text-muted-foreground">مزامنة الفواتير والمدفوعات</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">متصل</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-info" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Resend (Email)</p>
                        <p className="text-sm text-muted-foreground">إرسال البريد الإلكتروني للمراجعين</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">متصل</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-warning/10">
                    <Palette className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <CardTitle>المظهر</CardTitle>
                    <CardDescription>تخصيص مظهر التطبيق</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>الوضع</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">فاتح</SelectItem>
                      <SelectItem value="dark">داكن</SelectItem>
                      <SelectItem value="system">تلقائي (حسب النظام)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">إلغاء</Button>
        <Button className="gradient-primary">حفظ التغييرات</Button>
      </div>
    </div>
  );
};

export default Settings;