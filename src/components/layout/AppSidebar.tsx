import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  FolderKanban,
  Users,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    title: "الرئيسية",
    items: [
      { icon: LayoutDashboard, label: "لوحة التحكم", path: "/" },
    ],
  },
  {
    title: "المالية",
    items: [
      { icon: FileText, label: "الفواتير", path: "/invoices" },
      { icon: CreditCard, label: "المدفوعات", path: "/payments" },
    ],
  },
  {
    title: "العمليات",
    items: [
      { icon: FolderKanban, label: "المشاريع", path: "/projects" },
      { icon: Users, label: "العملاء", path: "/clients" },
    ],
  },
  {
    title: "النظام",
    items: [
      { icon: Bell, label: "الإشعارات", path: "/notifications" },
      { icon: Settings, label: "الإعدادات", path: "/settings" },
      { icon: HelpCircle, label: "الدعم", path: "/support" },
    ],
  },
];

const AppSidebar = ({ collapsed, onToggle }: AppSidebarProps) => {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen sticky top-0 gradient-sidebar border-l border-sidebar-border flex flex-col"
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <motion.div
          initial={false}
          animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto" }}
          className="flex items-center gap-3 overflow-hidden"
        >
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-sidebar-foreground text-lg">بوابة العملاء</h1>
            <p className="text-xs text-sidebar-muted">نظام إدارة متكامل</p>
          </div>
        </motion.div>
        
        {collapsed && (
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow mx-auto">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -left-3 top-20 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        {menuItems.map((section, sectionIndex) => (
          <div key={section.title} className="mb-6">
            {!collapsed && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 mb-2 text-xs font-semibold text-sidebar-muted uppercase tracking-wider"
              >
                {section.title}
              </motion.h2>
            )}
            
            <ul className="space-y-1 px-2">
              {section.items.map((item, itemIndex) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                          : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                        isActive ? "" : "group-hover:scale-110"
                      )} />
                      
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}

                      {collapsed && (
                        <div className="absolute right-full mr-2 px-2 py-1 bg-foreground text-background text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                          {item.label}
                        </div>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sidebar-muted hover:text-destructive hover:bg-destructive/10 transition-all duration-200",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">تسجيل الخروج</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
