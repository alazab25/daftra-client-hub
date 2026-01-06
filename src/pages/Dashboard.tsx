import { FileText, CreditCard, FolderKanban, TrendingUp } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import ProjectProgress from "@/components/dashboard/ProjectProgress";
import QuickActions from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مرحباً، محمد 👋</h1>
          <p className="text-muted-foreground">إليك ملخص حسابك اليوم</p>
        </div>
        <div className="text-sm text-muted-foreground">
          آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="إجمالي الفواتير"
          value="142,500 ر.س"
          change="+12.5% هذا الشهر"
          changeType="positive"
          icon={FileText}
          variant="primary"
          delay={0}
        />
        <StatsCard
          title="المدفوعات المستلمة"
          value="98,750 ر.س"
          change="+8.2% هذا الشهر"
          changeType="positive"
          icon={CreditCard}
          variant="success"
          delay={0.1}
        />
        <StatsCard
          title="المشاريع الجارية"
          value="4"
          change="2 مكتملة هذا الأسبوع"
          changeType="neutral"
          icon={FolderKanban}
          variant="warning"
          delay={0.2}
        />
        <StatsCard
          title="المستحقات"
          value="43,750 ر.س"
          change="-5.3% من الشهر الماضي"
          changeType="negative"
          icon={TrendingUp}
          variant="danger"
          delay={0.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Invoices - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentInvoices />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Project Progress */}
      <ProjectProgress />
    </div>
  );
};

export default Dashboard;
