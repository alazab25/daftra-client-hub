import { motion } from "framer-motion";
import { 
  CreditCard, 
  Search, 
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Receipt
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const payments = [
  { id: "PAY-001", invoice: "INV-001", amount: 15000, date: "2024-01-16", method: "تحويل بنكي", status: "completed" },
  { id: "PAY-002", invoice: "INV-003", amount: 22000, date: "2024-01-13", method: "بطاقة ائتمان", status: "completed" },
  { id: "PAY-003", invoice: "INV-006", amount: 17500, date: "2024-01-07", method: "تحويل بنكي", status: "completed" },
  { id: "PAY-004", invoice: "INV-006", amount: 17500, date: "2024-01-06", method: "شيك", status: "completed" },
  { id: "PAY-005", invoice: "INV-002", amount: 4250, date: "2024-01-15", method: "تحويل بنكي", status: "pending" },
];

const Payments = () => {
  const totalReceived = payments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">المدفوعات</h1>
          <p className="text-muted-foreground">سجل جميع المدفوعات والإيصالات</p>
        </div>
        <Button className="gradient-success">
          <Download className="w-4 h-4 ml-2" />
          تصدير السجل
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-success/10">
              <ArrowDownRight className="w-6 h-6 text-success" />
            </div>
            <Badge variant="success">مستلمة</Badge>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalReceived.toLocaleString()} ر.س</p>
          <p className="text-sm text-muted-foreground mt-1">إجمالي المدفوعات المستلمة</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-warning/10">
              <CreditCard className="w-6 h-6 text-warning" />
            </div>
            <Badge variant="warning">معلقة</Badge>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalPending.toLocaleString()} ر.س</p>
          <p className="text-sm text-muted-foreground mt-1">مدفوعات قيد المعالجة</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Receipt className="w-6 h-6 text-primary" />
            </div>
            <Badge variant="secondary">{payments.length}</Badge>
          </div>
          <p className="text-3xl font-bold text-foreground">{payments.length}</p>
          <p className="text-sm text-muted-foreground mt-1">إجمالي عمليات الدفع</p>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="ابحث في المدفوعات..." className="pr-10 bg-card" />
      </motion.div>

      {/* Payments List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl border border-border divide-y divide-border"
      >
        {payments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                payment.status === "completed" ? "bg-success/10" : "bg-warning/10"
              }`}>
                <CreditCard className={`w-6 h-6 ${
                  payment.status === "completed" ? "text-success" : "text-warning"
                }`} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{payment.id}</p>
                <p className="text-sm text-muted-foreground">
                  فاتورة: {payment.invoice} • {payment.method}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-left">
                <p className="font-bold text-foreground">{payment.amount.toLocaleString()} ر.س</p>
                <p className="text-sm text-muted-foreground">{payment.date}</p>
              </div>
              <Badge variant={payment.status === "completed" ? "success" : "warning"}>
                {payment.status === "completed" ? "مكتملة" : "معلقة"}
              </Badge>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Payments;
