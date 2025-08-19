"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

interface Activity {
  id: string
  type: "stock_update" | "product_add" | "product_edit" | "low_stock_alert"
  message: string
  user: string
  timestamp: Date
  status: "success" | "warning" | "info"
}

export function RecentActivities() {
  // Mock recent activities data
  const activities: Activity[] = [
    {
      id: "1",
      type: "stock_update",
      message: "Stok Pulpen Pilot G2 diperbarui menjadi 45 unit",
      user: "Admin",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: "success",
    },
    {
      id: "2",
      type: "low_stock_alert",
      message: "Peringatan: Stok Kertas HVS A4 tinggal 20 unit",
      user: "System",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: "warning",
    },
    {
      id: "3",
      type: "product_add",
      message: "Produk baru 'Spidol Whiteboard' ditambahkan",
      user: "Admin",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      status: "info",
    },
    {
      id: "4",
      type: "product_edit",
      message: "Harga Stapler Kenko diperbarui menjadi Rp 35.000",
      user: "Admin",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      status: "success",
    },
    {
      id: "5",
      type: "stock_update",
      message: "Stok Map Plastik A4 diperbarui menjadi 75 unit",
      user: "Admin",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      status: "success",
    },
  ]

  const getStatusVariant = (status: Activity["status"]) => {
    switch (status) {
      case "success":
        return "success"
      case "warning":
        return "warning"
      case "info":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aktivitas Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {activity.user === "System" ? "SY" : activity.user.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <Badge variant={getStatusVariant(activity.status)} className="text-xs">
                    {activity.type.replace("_", " ")}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{activity.user}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: id })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
