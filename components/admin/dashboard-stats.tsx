"use client"

import { StatisticCard } from "@/components/ui/statistic-card"
import { Package, AlertTriangle, FolderOpen, Activity } from "lucide-react"
import { sampleProducts, categories } from "@/lib/sample-data"

export function DashboardStats() {
  // Calculate statistics from sample data
  const totalProducts = sampleProducts.length
  const lowStockProducts = sampleProducts.filter((product) => product.stock <= 10).length
  const totalCategories = categories.length
  const recentActivities = 12 // Mock data

  const stats = [
    {
      title: "Total Produk",
      value: totalProducts,
      icon: <Package className="h-4 w-4" />,
      description: "Produk aktif",
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Stok Menipis",
      value: lowStockProducts,
      icon: <AlertTriangle className="h-4 w-4" />,
      description: "Perlu restok",
      trend: { value: 5, isPositive: false },
    },
    {
      title: "Total Kategori",
      value: totalCategories,
      icon: <FolderOpen className="h-4 w-4" />,
      description: "Kategori aktif",
    },
    {
      title: "Aktivitas Terbaru",
      value: recentActivities,
      icon: <Activity className="h-4 w-4" />,
      description: "Hari ini",
      trend: { value: 8, isPositive: true },
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatisticCard key={index} {...stat} />
      ))}
    </div>
  )
}
