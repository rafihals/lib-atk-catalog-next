import { AdminLayout } from "@/components/layout/admin-layout"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { QuickActions } from "@/components/admin/quick-actions"
import { RecentActivities } from "@/components/admin/recent-activities"
import { LowStockTable } from "@/components/admin/low-stock-table"
import { InventoryCharts } from "@/components/admin/inventory-charts"

export default function AdminDashboardPage() {
  return (
    <AdminLayout title="Dashboard" description="Ringkasan inventori dan aktivitas terbaru">
      <div className="space-y-6 lg:space-y-8 animate-fade-in">
        <div className="animate-slide-up">
          <DashboardStats />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="xl:col-span-1">
            <QuickActions />
          </div>
          <div className="xl:col-span-2">
            <RecentActivities />
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <InventoryCharts />
        </div>

        {/* Low Stock Table */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <LowStockTable />
        </div>
      </div>
    </AdminLayout>
  )
}
