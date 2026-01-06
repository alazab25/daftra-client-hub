import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Eye,
  Building,
  Calendar,
  TrendingUp,
  Plus,
  ArrowLeft,
  MoreVertical
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDocuments } from "@/hooks/useDocuments";

const statusConfig = {
  draft: { label: "مسودة", color: "bg-muted text-muted-foreground", icon: FileText },
  pending_review: { label: "قيد المراجعة", color: "bg-warning/10 text-warning", icon: Clock },
  needs_revision: { label: "يحتاج تعديل", color: "bg-destructive/10 text-destructive", icon: AlertTriangle },
  ready_for_approval: { label: "جاهز للاعتماد", color: "bg-info/10 text-info", icon: Eye },
  approved: { label: "معتمد", color: "bg-success/10 text-success", icon: CheckCircle2 },
  rejected: { label: "مرفوض", color: "bg-destructive/10 text-destructive", icon: XCircle },
};

const Documents = () => {
  const { documents, stats, isLoading } = useDocuments();

  const statCards = [
    { 
      label: "قيد المراجعة", 
      value: stats?.pending_review || 0, 
      icon: Clock, 
      color: "bg-warning/10 border-warning/20",
      iconColor: "text-warning"
    },
    { 
      label: "يحتاج تعديل", 
      value: stats?.needs_revision || 0, 
      icon: AlertTriangle, 
      color: "bg-destructive/10 border-destructive/20",
      iconColor: "text-destructive"
    },
    { 
      label: "جاهز للاعتماد", 
      value: stats?.ready_for_approval || 0, 
      icon: Eye, 
      color: "bg-info/10 border-info/20",
      iconColor: "text-info"
    },
    { 
      label: "معتمد اليوم", 
      value: stats?.approved_today || 0, 
      icon: CheckCircle2, 
      color: "bg-success/10 border-success/20",
      iconColor: "text-success"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">المستخلصات</h1>
          <p className="text-muted-foreground">إدارة مستخلصات المشاريع والموافقات</p>
        </div>
        <Link to="/documents/new">
          <Button className="gradient-primary gap-2">
            <Plus className="w-4 h-4" />
            رفع مستند جديد
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`${stat.color} border`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي المستندات</p>
                  <p className="text-2xl font-bold">{stats?.total || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-warning/10">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">بانتظار التوقيع</p>
                  <p className="text-2xl font-bold">{stats?.awaiting_signature || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-success/10">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">نسبة الإنجاز الشهري</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{stats?.monthly_completion || 0}%</p>
                    <span className="text-xs text-success">+5% من الأسبوع الماضي</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Documents Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">أحدث المستندات</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-muted/50 h-24 rounded-lg" />
                ))}
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>لا توجد مستندات بعد</p>
              </div>
            ) : (
              documents.slice(0, 4).map((doc) => {
                const status = statusConfig[doc.status as keyof typeof statusConfig];
                const StatusIcon = status?.icon || FileText;
                
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{doc.title}</p>
                          <p className="text-sm text-muted-foreground">{doc.description || 'مستخلص'}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {doc.projects?.name || 'غير محدد'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(doc.created_at).toLocaleDateString('ar-EG')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={status?.color}>
                          {status?.label}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>عرض التفاصيل</DropdownMenuItem>
                            <DropdownMenuItem>تعديل</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    {/* Progress */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">تقدم المراجعة</span>
                        <span>{doc.current_reviewer_order || 0} / {doc.total_reviewers || 0}</span>
                      </div>
                      <Progress 
                        value={doc.total_reviewers ? (((doc.current_reviewer_order || 1) - 1) / doc.total_reviewers) * 100 : 0} 
                        className="h-1.5" 
                      />
                    </div>
                  </motion.div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">النشاط الأخير</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-muted/50 h-16 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>لا توجد أنشطة حديثة</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documents;