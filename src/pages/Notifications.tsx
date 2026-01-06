import { motion } from "framer-motion";
import { 
  Bell, 
  FileText,
  CreditCard,
  FolderKanban,
  CheckCircle2,
  Clock,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const notifications = [
  {
    id: 1,
    type: "invoice",
    title: "فاتورة جديدة",
    message: "تم إصدار فاتورة جديدة INV-008 بقيمة 5,000 ر.س",
    time: "منذ 5 دقائق",
    read: false,
    icon: FileText,
  },
  {
    id: 2,
    type: "payment",
    title: "دفعة مستلمة",
    message: "تم استلام دفعة بقيمة 15,000 ر.س للفاتورة INV-001",
    time: "منذ ساعة",
    read: false,
    icon: CreditCard,
  },
  {
    id: 3,
    type: "project",
    title: "تحديث المشروع",
    message: "تم تحديث حالة مشروع تطوير الموقع إلى 75%",
    time: "منذ 3 ساعات",
    read: false,
    icon: FolderKanban,
  },
  {
    id: 4,
    type: "project",
    title: "مشروع مكتمل",
    message: "تم إكمال مشروع نظام إدارة المخزون بنجاح",
    time: "منذ يوم",
    read: true,
    icon: CheckCircle2,
  },
  {
    id: 5,
    type: "reminder",
    title: "تذكير بالدفع",
    message: "تذكير: الفاتورة INV-004 متأخرة عن موعد السداد",
    time: "منذ يومين",
    read: true,
    icon: Clock,
  },
];

const typeConfig = {
  invoice: { color: "text-primary", bg: "bg-primary/10" },
  payment: { color: "text-success", bg: "bg-success/10" },
  project: { color: "text-warning", bg: "bg-warning/10" },
  reminder: { color: "text-destructive", bg: "bg-destructive/10" },
};

const Notifications = () => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">الإشعارات</h1>
          <p className="text-muted-foreground">
            لديك {unreadCount} إشعارات غير مقروءة
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            تحديد الكل كمقروء
          </Button>
          <Button variant="outline" className="text-destructive">
            <Trash2 className="w-4 h-4 ml-2" />
            حذف الكل
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border divide-y divide-border"
      >
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          const config = typeConfig[notification.type as keyof typeof typeConfig];

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className={`p-4 flex items-start gap-4 hover:bg-muted/30 transition-colors cursor-pointer ${
                !notification.read ? "bg-primary/5" : ""
              }`}
            >
              <div className={`p-3 rounded-xl ${config.bg}`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      {notification.title}
                      {!notification.read && (
                        <Badge className="gradient-primary border-0 text-xs">جديد</Badge>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {notification.time}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد إشعارات</h3>
          <p className="text-muted-foreground">ستظهر هنا جميع الإشعارات والتنبيهات</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
