"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Package, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

interface StockHistoryEntry {
  id: string
  productName: string
  productSku: string
  previousStock: number
  newStock: number
  changeAmount: number
  changeType: "increase" | "decrease" | "adjustment"
  reason: string
  user: string
  timestamp: Date
}

export function StockHistory() {
  // Mock stock history data
  const stockHistory: StockHistoryEntry[] = [
    {
      id: "1",
      productName: "Pulpen Pilot G2",
      productSku: "PLT-G2-001",
      previousStock: 45,
      newStock: 50,
      changeAmount: 5,
      changeType: "increase",
      reason: "Restok dari supplier",
      user: "Admin",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: "2",
      productName: "Kertas HVS A4",
      productSku: "P1-HVS-001",
      previousStock: 25,
      newStock: 20,
      changeAmount: -5,
      changeType: "decrease",
      reason: "Penjualan ke customer",
      user: "Sales",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: "3",
      productName: "Stapler Kenko",
      productSku: "KNK-STP-001",
      previousStock: 12,
      newStock: 15,
      changeAmount: 3,
      changeType: "increase",
      reason: "Koreksi stok fisik",
      user: "Admin",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    },
    {
      id: "4",
      productName: "Spidol Snowman",
      productSku: "SNW-SPD-001",
      previousStock: 35,
      newStock: 30,
      changeAmount: -5,
      changeType: "decrease",
      reason: "Penjualan retail",
      user: "Sales",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    },
    {
      id: "5",
      productName: "Map Plastik A4",
      productSku: "GEN-MAP-001",
      previousStock: 70,
      newStock: 75,
      changeAmount: 5,
      changeType: "increase",
      reason: "Pembelian tambahan",
      user: "Admin",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    },
  ]

  const getChangeIcon = (changeType: StockHistoryEntry["changeType"]) => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="h-4 w-4 text-success" />
      case "decrease":
        return <TrendingDown className="h-4 w-4 text-destructive" />
      default:
        return <Package className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getChangeVariant = (changeType: StockHistoryEntry["changeType"]) => {
    switch (changeType) {
      case "increase":
        return "success"
      case "decrease":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="h-5 w-5" />
          <span>Riwayat Perubahan Stok</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>Perubahan</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Waktu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockHistory.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{entry.productName}</div>
                      <div className="text-sm text-muted-foreground">{entry.productSku}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getChangeIcon(entry.changeType)}
                      <Badge variant={getChangeVariant(entry.changeType)} className="text-xs">
                        {entry.changeAmount > 0 ? "+" : ""}
                        {entry.changeAmount}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="text-muted-foreground">{entry.previousStock}</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium">{entry.newStock}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{entry.reason}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {entry.user === "Admin" ? <User className="h-3 w-3" /> : entry.user.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{entry.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(entry.timestamp, { addSuffix: true, locale: id })}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
