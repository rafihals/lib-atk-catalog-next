"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StockBadge } from "@/components/ui/stock-badge"
import { sampleProducts } from "@/lib/sample-data"
import { Package } from "lucide-react"

export function LowStockTable() {
  // Filter products with low stock (≤ 10 units)
  const lowStockProducts = sampleProducts.filter((product) => product.stock <= 10)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Package className="h-5 w-5" />
          <span>Stok Menipis</span>
        </CardTitle>
        <Button variant="outline" size="sm" className="bg-transparent">
          Lihat Semua
        </Button>
      </CardHeader>
      <CardContent>
        {lowStockProducts.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">Tidak ada produk dengan stok menipis</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lowStockProducts.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="text-sm font-medium text-primary">{formatPrice(product.price)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <StockBadge stock={product.stock} />
                  <Button size="sm" variant="outline" className="bg-transparent">
                    Update Stok
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
