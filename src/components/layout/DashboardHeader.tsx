import { Bell, Search, Menu, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useData";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const DashboardHeader = ({ onToggleSidebar, sidebarCollapsed }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { data: profile } = useProfile();

  const displayName = profile?.name || user?.email?.split("@")[0] || "المستخدم";
  const initials = displayName.slice(0, 2);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth", { replace: true });
  };

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Right Side - Search */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="relative hidden sm:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ابحث هنا..."
            className="w-64 pr-10 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Left Side - Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge 
                className="absolute -top-1 -left-1 w-5 h-5 p-0 flex items-center justify-center text-xs gradient-primary border-0"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>الإشعارات</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">فاتورة جديدة</span>
              <span className="text-sm text-muted-foreground">تم إصدار فاتورة جديدة بقيمة 5,000 ر.س</span>
              <span className="text-xs text-muted-foreground">منذ 5 دقائق</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">تحديث المشروع</span>
              <span className="text-sm text-muted-foreground">تم تحديث حالة مشروع تطوير الموقع</span>
              <span className="text-xs text-muted-foreground">منذ ساعة</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-center text-primary"
              onClick={() => navigate("/notifications")}
            >
              عرض جميع الإشعارات
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2">
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{profile?.role || "مستخدم"}</p>
              </div>
              <Avatar className="w-9 h-9">
                <AvatarImage src="" />
                <AvatarFallback className="gradient-primary text-primary-foreground text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>حسابي</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <User className="w-4 h-4 ml-2" />
              الملف الشخصي
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              الإعدادات
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;