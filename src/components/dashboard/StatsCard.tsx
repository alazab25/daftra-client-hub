import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "primary" | "success" | "warning" | "danger";
  delay?: number;
}

const variantStyles = {
  primary: {
    gradient: "gradient-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  success: {
    gradient: "gradient-success",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  warning: {
    gradient: "gradient-warning",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  danger: {
    gradient: "gradient-danger",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
};

const StatsCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  variant = "primary",
  delay = 0,
}: StatsCardProps) => {
  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-border"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <p
              className={cn(
                "text-sm font-medium flex items-center gap-1",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {changeType === "positive" && "↑"}
              {changeType === "negative" && "↓"}
              {change}
            </p>
          )}
        </div>
        
        <div className={cn("p-3 rounded-xl", styles.iconBg)}>
          <Icon className={cn("w-6 h-6", styles.iconColor)} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
