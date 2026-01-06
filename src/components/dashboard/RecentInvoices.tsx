import { motion } from "framer-motion";
import { FileText, MoreHorizontal, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const invoices = [
  {
    id: "INV-001",
    client: "شركة التقنية المتقدمة",
    amount: "15,000",
    date: "2024-01-15",
    status: "paid",
  },
  {
    id: "INV-002",
    client: "مؤسسة البناء الحديث",
    amount: "8,500",
    date: "2024-01-14",
    status: "pending",
  },
  {
    id: "INV-003",
    client: "شركة الخدمات اللوجستية",
    amount: "22,000",
    date: "2024-01-12",
    status: "paid",
  },
  {
    id: "INV-004",
    client: "مجموعة الاستثمار العربي",
    amount: "45,000",
    date: "2024-01-10",
    status: "overdue",
  },
  {
    id: "INV-005",
    client: "شركة التسويق الرقمي",
    amount: "12,750",
    date: "2024-01-08",
    status: "pending",
  },
];

const statusConfig = {
  paid: { label: "مدفوعة", variant: "success" as const },
  pending: { label: "معلقة", variant: "warning" as const },
  overdue: { label: "متأخرة", variant: "destructive" as const },
};

const RecentInvoices = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-2xl shadow-md border border-border"
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">أحدث الفواتير</h2>
            <p className="text-sm text-muted-foreground">آخر 5 فواتير صادرة</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          عرض الكل
        </Button>
      </div>

      <div className="divide-y divide-border">
        {invoices.map((invoice, index) => (
          <motion.div
            key={invoice.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{invoice.id}</p>
                <p className="text-sm text-muted-foreground">{invoice.client}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-left">
                <p className="font-semibold text-foreground">{invoice.amount} ر.س</p>
                <p className="text-sm text-muted-foreground">{invoice.date}</p>
              </div>

              <Badge
                variant={statusConfig[invoice.status as keyof typeof statusConfig].variant}
                className="min-w-[70px] justify-center"
              >
                {statusConfig[invoice.status as keyof typeof statusConfig].label}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 ml-2" />
                    تحميل PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem>عرض التفاصيل</DropdownMenuItem>
                  <DropdownMenuItem>طباعة</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentInvoices;
