import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Building2,
  Mail,
  Phone,
  MoreHorizontal,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const clients = [
  { id: 1, name: "شركة التقنية المتقدمة", email: "info@tech-co.com", phone: "0501234567", invoices: 12, balance: 15000, status: "active" },
  { id: 2, name: "مؤسسة البناء الحديث", email: "contact@build.sa", phone: "0559876543", invoices: 8, balance: 8500, status: "active" },
  { id: 3, name: "شركة الخدمات اللوجستية", email: "hello@logistics.com", phone: "0541122334", invoices: 15, balance: 0, status: "active" },
  { id: 4, name: "مجموعة الاستثمار العربي", email: "invest@arab-group.com", phone: "0533445566", invoices: 6, balance: 45000, status: "pending" },
  { id: 5, name: "شركة التسويق الرقمي", email: "team@digital.sa", phone: "0522334455", invoices: 4, balance: 12750, status: "active" },
  { id: 6, name: "مؤسسة التجارة الدولية", email: "trade@intl.com", phone: "0511223344", invoices: 20, balance: 0, status: "active" },
];

const Clients = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">العملاء</h1>
          <p className="text-muted-foreground">إدارة بيانات العملاء</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">إجمالي العملاء</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{clients.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-5 h-5 text-success" />
            <span className="text-muted-foreground">العملاء النشطين</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{clients.filter(c => c.status === "active").length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-muted-foreground">إجمالي المستحقات</span>
          </div>
          <p className="text-3xl font-bold text-foreground">
            {clients.reduce((sum, c) => sum + c.balance, 0).toLocaleString()} ر.س
          </p>
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
        <Input placeholder="ابحث عن عميل..." className="pr-10 bg-card" />
      </motion.div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="gradient-primary text-primary-foreground">
                    {client.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{client.name}</h3>
                  <Badge variant={client.status === "active" ? "success" : "warning"} className="mt-1">
                    {client.status === "active" ? "نشط" : "معلق"}
                  </Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 ml-2" />
                    عرض الملف
                  </DropdownMenuItem>
                  <DropdownMenuItem>الفواتير</DropdownMenuItem>
                  <DropdownMenuItem>المشاريع</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span dir="ltr">{client.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">الفواتير</p>
                <p className="font-semibold text-foreground">{client.invoices}</p>
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">الرصيد</p>
                <p className={`font-semibold ${client.balance > 0 ? "text-warning" : "text-success"}`}>
                  {client.balance.toLocaleString()} ر.س
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
