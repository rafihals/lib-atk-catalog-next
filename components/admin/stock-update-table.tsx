"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StockBadge } from "@/components/ui/stock-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Save, RotateCcw, TrendingUp, TrendingDown } from "lucide-react"
import { sampleProducts } from "@/lib/sample-data"

interface StockUpdate {
  productId: string
  currentStock: number
  newStock: string
  reason: string
}

export function StockUpdateTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [stockUpdates, setStockUpdates] = useState<Record<string, StockUpdate>>({})

  // Filter products based on search term
  const filteredProducts = sampleProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStockChange = (productId: string, newStock: string, currentStock: number) => {
    setStockUpdates((prev) => ({
      ...prev,
      [productId]: {
        productId,
        currentStock,
        newStock,
        reason: prev[productId]?.reason || "",
      },
    }))
  }

  const handleReasonChange = (productId: string, reason: string) => {
    setStockUpdates((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        reason,
      },
    }))
  }

  const handleSaveUpdates = () => {
    const updates = Object.values(stockUpdates).filter((update) => update.newStock !== "")
    console.log("Saving stock updates:", updates)
    // TODO: Implement actual save logic
    setStockUpdates({})
  }

  const handleResetUpdates = () => {
    setStockUpdates({})
  }

  const getStockDifference = (productId: string, currentStock: number) => {
    const update = stockUpdates[productId]
    if (!update || !update.newStock) return null

    const newStock = Number.parseInt(update.newStock)
    const difference = newStock - currentStock

    return {
      difference,
      isIncrease: difference > 0,
      isDecrease: difference < 0,
    }
  }

  const pendingUpdatesCount = Object.keys(stockUpdates).filter((key) => stockUpdates[key].newStock !== "").length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Update Stok Cepat</CardTitle>
          <div className="flex items-center space-x-2">
            {pendingUpdatesCount > 0 && (
              <>
                <Button variant="outline" size="sm" onClick={handleResetUpdates}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset ({pendingUpdatesCount})
                </Button>
                <Button size="sm" onClick={handleSaveUpdates}>
                  <Save className="mr-2 h-4 w-4" />
                  Simpan Perubahan ({pendingUpdatesCount})
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari produk untuk update stok..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Stok Saat Ini</TableHead>
                <TableHead>Stok Baru</TableHead>
                <TableHead>Perubahan</TableHead>
                <TableHead>Keterangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.slice(0, 10).map((product) => {
                const stockDiff = getStockDifference(product.id, product.stock)
                const currentUpdate = stockUpdates[product.id]

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.sku}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <StockBadge stock={product.stock} />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={currentUpdate?.newStock || ""}
                        onChange={(e) => handleStockChange(product.id, e.target.value, product.stock)}
                        placeholder={product.stock.toString()}
                        className="w-24"
                        min="0"
                      />
                    </TableCell>
                    <TableCell>
                      {stockDiff && (
                        <div className="flex items-center space-x-1">
                          {stockDiff.isIncrease ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : stockDiff.isDecrease ? (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          ) : null}
                          <span
                            className={
                              stockDiff.isIncrease
                                ? "text-success font-medium"
                                : stockDiff.isDecrease
                                  ? "text-destructive font-medium"
                                  : "text-muted-foreground"
                            }
                          >
                            {stockDiff.difference > 0 ? "+" : ""}
                            {stockDiff.difference}
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Input
                        value={currentUpdate?.reason || ""}
                        onChange={(e) => handleReasonChange(product.id, e.target.value)}
                        placeholder="Alasan perubahan..."
                        className="w-40"
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
