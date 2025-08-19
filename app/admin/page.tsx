import { AdminLayout } from "@/components/layout/admin-layout"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { QuickActions } from "@/components/admin/quick-actions"
import { RecentActivities } from "@/components/admin/recent-activities"
import { LowStockTable } from "@/components/admin/low-stock-table"

export default function AdminDashboardPage() {
  return (
    <AdminLayout title="Dashboard" description="Ringkasan inventori dan aktivitas terbaru">
      <div className="space-y-8 animate-fade-in">
        {/* Statistics Cards */}
        <div className="animate-slide-up">
          <DashboardStats />
        </div>

        {/* Quick Actions and Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
          <div className="lg:col-span-2">
            <RecentActivities />
          </div>
        </div>

        {/* Low Stock Table */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <LowStockTable />
        </div>
      </div>
    </AdminLayout>
  )
}
