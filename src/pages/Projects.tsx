import { motion } from "framer-motion";
import { 
  FolderKanban, 
  Clock, 
  CheckCircle2,
  Users,
  Calendar,
  MoreHorizontal,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projects = [
  {
    id: 1,
    name: "تطوير موقع الشركة الإلكتروني",
    description: "تصميم وتطوير موقع إلكتروني حديث للشركة يتضمن نظام إدارة محتوى",
    progress: 75,
    status: "in_progress",
    priority: "high",
    startDate: "2024-01-01",
    dueDate: "2024-02-15",
    team: ["أحمد", "سارة", "محمد"],
    tasks: { completed: 12, total: 16 },
  },
  {
    id: 2,
    name: "تطبيق الجوال للعملاء",
    description: "تطوير تطبيق جوال لنظامي iOS و Android للعملاء",
    progress: 45,
    status: "in_progress",
    priority: "medium",
    startDate: "2024-01-15",
    dueDate: "2024-03-01",
    team: ["خالد", "نورة"],
    tasks: { completed: 9, total: 20 },
  },
  {
    id: 3,
    name: "نظام إدارة المخزون",
    description: "نظام متكامل لإدارة المخزون والمستودعات",
    progress: 100,
    status: "completed",
    priority: "high",
    startDate: "2023-11-01",
    dueDate: "2024-01-10",
    team: ["فهد", "ليلى", "عمر"],
    tasks: { completed: 24, total: 24 },
  },
  {
    id: 4,
    name: "منصة التجارة الإلكترونية",
    description: "بناء متجر إلكتروني متكامل مع نظام دفع آمن",
    progress: 20,
    status: "in_progress",
    priority: "high",
    startDate: "2024-01-20",
    dueDate: "2024-04-20",
    team: ["سلمان", "هند"],
    tasks: { completed: 4, total: 20 },
  },
];

const statusConfig = {
  in_progress: { label: "جاري", variant: "warning" as const, color: "text-warning" },
  completed: { label: "مكتمل", variant: "success" as const, color: "text-success" },
  on_hold: { label: "متوقف", variant: "secondary" as const, color: "text-muted-foreground" },
};

const priorityConfig = {
  high: { label: "عالية", variant: "destructive" as const },
  medium: { label: "متوسطة", variant: "warning" as const },
  low: { label: "منخفضة", variant: "secondary" as const },
};

const Projects = () => {
  const inProgressCount = projects.filter(p => p.status === "in_progress").length;
  const completedCount = projects.filter(p => p.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">المشاريع</h1>
          <p className="text-muted-foreground">متابعة وإدارة جميع المشاريع</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <FolderKanban className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">إجمالي المشاريع</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{projects.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-warning" />
            <span className="text-muted-foreground">قيد التنفيذ</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{inProgressCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-muted-foreground">مكتملة</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{completedCount}</p>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>عرض التفاصيل</DropdownMenuItem>
                    <DropdownMenuItem>المهام</DropdownMenuItem>
                    <DropdownMenuItem>المستندات</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant={statusConfig[project.status as keyof typeof statusConfig].variant}>
                  {statusConfig[project.status as keyof typeof statusConfig].label}
                </Badge>
                <Badge variant={priorityConfig[project.priority as keyof typeof priorityConfig].variant}>
                  أولوية {priorityConfig[project.priority as keyof typeof priorityConfig].label}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">التقدم</span>
                  <span className={`font-semibold ${
                    project.progress === 100 ? "text-success" : "text-primary"
                  }`}>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.dueDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {project.tasks.completed}/{project.tasks.total}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{project.team.length}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
