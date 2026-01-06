import { motion } from "framer-motion";
import { 
  FileText, 
  CreditCard, 
  MessageSquare, 
  Download,
  Plus,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: FileText,
    label: "عرض الفواتير",
    description: "استعراض جميع الفواتير",
    variant: "primary" as const,
  },
  {
    icon: CreditCard,
    label: "سجل المدفوعات",
    description: "متابعة المدفوعات",
    variant: "success" as const,
  },
  {
    icon: Download,
    label: "تحميل التقارير",
    description: "تقارير مالية شاملة",
    variant: "warning" as const,
  },
  {
    icon: MessageSquare,
    label: "الدعم الفني",
    description: "تواصل معنا",
    variant: "info" as const,
  },
];

const variantStyles = {
  primary: "bg-primary/10 text-primary hover:bg-primary/20",
  success: "bg-success/10 text-success hover:bg-success/20",
  warning: "bg-warning/10 text-warning hover:bg-warning/20",
  info: "bg-info/10 text-info hover:bg-info/20",
};

const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-card rounded-2xl shadow-md border border-border p-6"
    >
      <h2 className="text-lg font-semibold text-foreground mb-4">إجراءات سريعة</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${variantStyles[action.variant]}`}
          >
            <action.icon className="w-6 h-6" />
            <span className="font-medium text-sm">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
