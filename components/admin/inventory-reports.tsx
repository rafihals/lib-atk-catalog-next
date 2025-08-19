"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Download, TrendingUp, TrendingDown, Package, AlertTriangle } from "lucide-react"
import { sampleProducts, categories } from "@/lib/sample-data"

export function InventoryReports() {
  // Calculate inventory statistics
  const totalProducts = sampleProducts.length
  const totalStockValue = sampleProducts.reduce((sum, product) => sum + product.price * product.stock, 0)
  const lowStockProducts = sampleProducts.filter((product) => product.stock <= 10)
  const outOfStockProducts = sampleProducts.filter((product) => product.stock === 0)

  // Category analysis
  const categoryStats = categories.map((category) => {
    const categoryProducts = sampleProducts.filter((product) => product.category === category.name)
    const totalStock = categoryProducts.reduce((sum, product) => sum + product.stock, 0)
    const totalValue = categoryProducts.reduce((sum, product) => sum + product.price * product.stock, 0)
    const lowStockCount = categoryProducts.filter((product) => product.stock <= 10).length

    return {
      name: category.name,
      productCount: categoryProducts.length,
      totalStock,
      totalValue,
      lowStockCount,
      percentage: (categoryProducts.length / totalProducts) * 100,
    }
  })

  // Top products by stock value
  const topProductsByValue = [...sampleProducts].sort((a, b) => b.price * b.stock - a.price * a.stock).slice(0, 5)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num)
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Nilai Stok</p>
                <p className="text-2xl font-bold">{formatPrice(totalStockValue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Produk Aktif</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stok Menipis</p>
                <p className="text-2xl font-bold text-warning">{lowStockProducts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stok Habis</p>
                <p className="text-2xl font-bold text-destructive">{outOfStockProducts.length}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Analysis */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Analisis per Kategori</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {category.productCount} produk
                      </Badge>
                      {category.lowStockCount > 0 && (
                        <Badge variant="warning" className="text-xs">
                          {category.lowStockCount} menipis
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Total Stok: {formatNumber(category.totalStock)}</span>
                    <span>Nilai: {formatPrice(category.totalValue)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products by Value */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Produk Tertinggi (Nilai Stok)</CardTitle>
            <Button variant="outline" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              Detail
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProductsByValue.map((product, index) => {
                const stockValue = product.price * product.stock
                const maxValue = topProductsByValue[0].price * topProductsByValue[0].stock
                const percentage = (stockValue / maxValue) * 100

                return (
                  <div key={product.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                        <span className="text-sm font-medium">{product.name}</span>
                      </div>
                      <span className="text-sm font-bold">{formatPrice(stockValue)}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{product.category}</span>
                      <span>
                        {formatNumber(product.stock)} × {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Export Laporan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Laporan Inventori (PDF)
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Data Stok (Excel)
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Riwayat Perubahan (CSV)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
