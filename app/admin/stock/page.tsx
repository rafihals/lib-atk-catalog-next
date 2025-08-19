import { AdminLayout } from "@/components/layout/admin-layout"
import { StockUpdateTable } from "@/components/admin/stock-update-table"
import { StockHistory } from "@/components/admin/stock-history"
import { InventoryReports } from "@/components/admin/inventory-reports"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StockManagementPage() {
  return (
    <AdminLayout title="Manajemen Stok" description="Kelola stok produk dan pantau perubahan inventori">
      <Tabs defaultValue="update" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="update">Update Stok</TabsTrigger>
          <TabsTrigger value="history">Riwayat</TabsTrigger>
          <TabsTrigger value="reports">Laporan</TabsTrigger>
        </TabsList>

        <TabsContent value="update" className="space-y-6">
          <StockUpdateTable />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <StockHistory />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <InventoryReports />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}
