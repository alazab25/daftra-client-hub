import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye,
  MoreHorizontal,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const invoices = [
  { id: "INV-001", client: "شركة التقنية المتقدمة", amount: 15000, date: "2024-01-15", dueDate: "2024-02-15", status: "paid" },
  { id: "INV-002", client: "مؤسسة البناء الحديث", amount: 8500, date: "2024-01-14", dueDate: "2024-02-14", status: "pending" },
  { id: "INV-003", client: "شركة الخدمات اللوجستية", amount: 22000, date: "2024-01-12", dueDate: "2024-02-12", status: "paid" },
  { id: "INV-004", client: "مجموعة الاستثمار العربي", amount: 45000, date: "2024-01-10", dueDate: "2024-01-25", status: "overdue" },
  { id: "INV-005", client: "شركة التسويق الرقمي", amount: 12750, date: "2024-01-08", dueDate: "2024-02-08", status: "pending" },
  { id: "INV-006", client: "مؤسسة التجارة الدولية", amount: 35000, date: "2024-01-05", dueDate: "2024-02-05", status: "paid" },
  { id: "INV-007", client: "شركة الاتصالات المتحدة", amount: 18500, date: "2024-01-03", dueDate: "2024-02-03", status: "pending" },
];

const statusConfig = {
  paid: { label: "مدفوعة", variant: "success" as const },
  pending: { label: "معلقة", variant: "warning" as const },
  overdue: { label: "متأخرة", variant: "destructive" as const },
};

const Invoices = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInvoices = statusFilter === "all" 
    ? invoices 
    : invoices.filter(inv => inv.status === statusFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">الفواتير</h1>
          <p className="text-muted-foreground">إدارة ومتابعة جميع الفواتير</p>
        </div>
        <Button className="gradient-primary">
          <Download className="w-4 h-4 ml-2" />
          تصدير الفواتير
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-4 border border-border"
        >
          <p className="text-sm text-muted-foreground">إجمالي الفواتير</p>
          <p className="text-2xl font-bold text-foreground">156,750 ر.س</p>
          <p className="text-sm text-success">7 فواتير</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-4 border border-border"
        >
          <p className="text-sm text-muted-foreground">المدفوعة</p>
          <p className="text-2xl font-bold text-success">72,000 ر.س</p>
          <p className="text-sm text-muted-foreground">3 فواتير</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-4 border border-border"
        >
          <p className="text-sm text-muted-foreground">المعلقة والمتأخرة</p>
          <p className="text-2xl font-bold text-warning">84,750 ر.س</p>
          <p className="text-sm text-muted-foreground">4 فواتير</p>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl p-4 border border-border flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="ابحث عن فاتورة..." className="pr-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="paid">مدفوعة</SelectItem>
            <SelectItem value="pending">معلقة</SelectItem>
            <SelectItem value="overdue">متأخرة</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Calendar className="w-4 h-4 ml-2" />
          تحديد الفترة
        </Button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl border border-border overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right">رقم الفاتورة</TableHead>
              <TableHead className="text-right">العميل</TableHead>
              <TableHead className="text-right">المبلغ</TableHead>
              <TableHead className="text-right">تاريخ الإصدار</TableHead>
              <TableHead className="text-right">تاريخ الاستحقاق</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell className="font-semibold">{invoice.amount.toLocaleString()} ر.س</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[invoice.status as keyof typeof statusConfig].variant}>
                    {statusConfig[invoice.status as keyof typeof statusConfig].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 ml-2" />
                        عرض
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 ml-2" />
                        تحميل PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default Invoices;
