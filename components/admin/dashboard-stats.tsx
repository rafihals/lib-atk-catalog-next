"use client"
import { Package, AlertTriangle, FolderOpen, Activity, TrendingUp, TrendingDown } from "lucide-react"
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
      icon: <Package className="h-5 w-5 text-blue-600" />,
      description: "Produk aktif",
      trend: { value: 12, isPositive: true },
      bgGradient: "from-blue-500/10 to-blue-600/5",
      borderColor: "border-blue-200",
    },
    {
      title: "Stok Menipis",
      value: lowStockProducts,
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      description: "Perlu restok",
      trend: { value: 5, isPositive: false },
      bgGradient: "from-amber-500/10 to-amber-600/5",
      borderColor: "border-amber-200",
    },
    {
      title: "Total Kategori",
      value: totalCategories,
      icon: <FolderOpen className="h-5 w-5 text-emerald-600" />,
      description: "Kategori aktif",
      bgGradient: "from-emerald-500/10 to-emerald-600/5",
      borderColor: "border-emerald-200",
    },
    {
      title: "Aktivitas Terbaru",
      value: recentActivities,
      icon: <Activity className="h-5 w-5 text-purple-600" />,
      description: "Hari ini",
      trend: { value: 8, isPositive: true },
      bgGradient: "from-purple-500/10 to-purple-600/5",
      borderColor: "border-purple-200",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`
            relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.bgGradient} 
            border ${stat.borderColor} shadow-sm hover:shadow-lg transition-all duration-300
            transform hover:-translate-y-1 group
          `}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-white/50 backdrop-blur-sm">{stat.icon}</div>
              {stat.trend && (
                <div
                  className={`flex items-center text-sm font-medium ${
                    stat.trend.isPositive ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {stat.trend.isPositive ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {stat.trend.value}%
                </div>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-2xl lg:text-3xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                {stat.value.toLocaleString()}
              </p>
              <p className="text-sm font-medium text-slate-600">{stat.title}</p>
              <p className="text-xs text-slate-500">{stat.description}</p>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      ))}
    </div>
  )
}
