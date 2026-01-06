import { motion } from "framer-motion";
import { FolderKanban, Clock, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    name: "تطوير موقع الشركة",
    progress: 75,
    status: "in_progress",
    dueDate: "2024-02-15",
    tasks: { completed: 12, total: 16 },
  },
  {
    id: 2,
    name: "تطبيق الجوال",
    progress: 45,
    status: "in_progress",
    dueDate: "2024-03-01",
    tasks: { completed: 9, total: 20 },
  },
  {
    id: 3,
    name: "نظام إدارة المخزون",
    progress: 100,
    status: "completed",
    dueDate: "2024-01-10",
    tasks: { completed: 24, total: 24 },
  },
  {
    id: 4,
    name: "منصة التجارة الإلكترونية",
    progress: 20,
    status: "in_progress",
    dueDate: "2024-04-20",
    tasks: { completed: 4, total: 20 },
  },
];

const ProjectProgress = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-card rounded-2xl shadow-md border border-border"
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-success/10">
            <FolderKanban className="w-5 h-5 text-success" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">تقدم المشاريع</h2>
            <p className="text-sm text-muted-foreground">المشاريع الجارية والمكتملة</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          عرض الكل
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-foreground">{project.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {project.dueDate}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {project.tasks.completed}/{project.tasks.total} مهمة
                  </span>
                </div>
              </div>
              <span
                className={`text-sm font-semibold ${
                  project.progress === 100 ? "text-success" : "text-primary"
                }`}
              >
                {project.progress}%
              </span>
            </div>

            <Progress
              value={project.progress}
              className="h-2"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectProgress;
