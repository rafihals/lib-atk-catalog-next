"use client"

import { Card } from "@/components/ui/card"
import { sampleProducts } from "@/lib/sample-data"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

export function InventoryCharts() {
  const totalProducts = sampleProducts.length
  const lowStockProducts = sampleProducts.filter((p) => p.stock <= 10).length
  const inStockProducts = totalProducts - lowStockProducts

  const pieData = [
    { name: "Stok Tersedia", value: inStockProducts, color: "#059669" },
    { name: "Stok Menipis", value: lowStockProducts, color: "#d97706" },
  ]

  const monthlyData = [
    { month: "Jan", stockIn: 120, stockOut: 80 },
    { month: "Feb", stockIn: 150, stockOut: 95 },
    { month: "Mar", stockIn: 180, stockOut: 110 },
    { month: "Apr", stockIn: 200, stockOut: 125 },
    { month: "May", stockIn: 170, stockOut: 140 },
    { month: "Jun", stockIn: 190, stockOut: 155 },
  ]

  const categoryData = sampleProducts.reduce(
    (acc, product) => {
      const category = product.category
      if (!acc[category]) {
        acc[category] = { name: category, count: 0, value: 0 }
      }
      acc[category].count += 1
      acc[category].value += product.price * product.stock
      return acc
    },
    {} as Record<string, { name: string; count: number; value: number }>,
  )

  const categoryChartData = Object.values(categoryData)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 bg-gradient-to-br from-white to-blue-50/30 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Ringkasan Inventori</h3>
          <p className="text-sm text-slate-600">Distribusi status stok produk</p>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, "Produk"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center space-x-6 mt-4">
          {pieData.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
              <span className="text-sm text-slate-600">{entry.name}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-white to-emerald-50/30 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Perubahan Stok Bulanan</h3>
          <p className="text-sm text-slate-600">Tren stok masuk vs keluar</p>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="stockIn"
                stroke="#059669"
                strokeWidth={3}
                dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                name="Stok Masuk"
              />
              <Line
                type="monotone"
                dataKey="stockOut"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
                name="Stok Keluar"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-white to-purple-50/30 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Distribusi Kategori</h3>
          <p className="text-sm text-slate-600">Jumlah produk per kategori</p>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Jumlah Produk" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
