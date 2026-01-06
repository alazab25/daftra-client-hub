import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon, 
  User,
  Bell,
  Shield,
  Palette,
  Globe
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

const Settings = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>
        <p className="text-muted-foreground">إدارة إعدادات حسابك والنظام</p>
      </div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-primary/10">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">الملف الشخصي</h2>
            <p className="text-sm text-muted-foreground">معلومات حسابك الأساسية</p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>الاسم الأول</Label>
              <Input defaultValue="محمد" />
            </div>
            <div className="space-y-2">
              <Label>الاسم الأخير</Label>
              <Input defaultValue="أحمد" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>البريد الإلكتروني</Label>
            <Input type="email" defaultValue="mohammed@example.com" />
          </div>
          <div className="space-y-2">
            <Label>رقم الجوال</Label>
            <Input type="tel" defaultValue="0501234567" dir="ltr" className="text-right" />
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-warning/10">
            <Bell className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">الإشعارات</h2>
            <p className="text-sm text-muted-foreground">إدارة تفضيلات الإشعارات</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">إشعارات البريد الإلكتروني</p>
              <p className="text-sm text-muted-foreground">استلام إشعارات عبر البريد</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">إشعارات الفواتير الجديدة</p>
              <p className="text-sm text-muted-foreground">تنبيه عند إصدار فاتورة جديدة</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">تذكيرات الدفع</p>
              <p className="text-sm text-muted-foreground">تذكير قبل موعد استحقاق الفاتورة</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">تحديثات المشاريع</p>
              <p className="text-sm text-muted-foreground">إشعار عند تحديث حالة المشروع</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </motion.div>

      {/* Display Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-success/10">
            <Globe className="w-5 h-5 text-success" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">إعدادات العرض</h2>
            <p className="text-sm text-muted-foreground">تخصيص طريقة عرض البيانات</p>
          </div>
        </div>

        <div className="grid gap-4">
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
              <Select defaultValue="sar">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sar">ريال سعودي (ر.س)</SelectItem>
                  <SelectItem value="usd">دولار أمريكي ($)</SelectItem>
                  <SelectItem value="egp">جنيه مصري (ج.م)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>المنطقة الزمنية</Label>
            <Select defaultValue="asia-riyadh">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asia-riyadh">الرياض (GMT+3)</SelectItem>
                <SelectItem value="asia-dubai">دبي (GMT+4)</SelectItem>
                <SelectItem value="africa-cairo">القاهرة (GMT+2)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-destructive/10">
            <Shield className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">الأمان</h2>
            <p className="text-sm text-muted-foreground">إعدادات الأمان وكلمة المرور</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full sm:w-auto">
            تغيير كلمة المرور
          </Button>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">التحقق بخطوتين</p>
              <p className="text-sm text-muted-foreground">إضافة طبقة أمان إضافية لحسابك</p>
            </div>
            <Switch />
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">إلغاء</Button>
        <Button className="gradient-primary">حفظ التغييرات</Button>
      </div>
    </div>
  );
};

export default Settings;
