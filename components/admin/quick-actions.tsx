"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Upload, Download, BarChart3 } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Tambah Produk",
      description: "Tambahkan produk baru ke katalog",
      icon: <Plus className="h-5 w-5" />,
      action: () => console.log("Add product"),
      variant: "default" as const,
    },
    {
      title: "Import Data",
      description: "Import produk dari file Excel",
      icon: <Upload className="h-5 w-5" />,
      action: () => console.log("Import data"),
      variant: "outline" as const,
    },
    {
      title: "Export Laporan",
      description: "Download laporan inventori",
      icon: <Download className="h-5 w-5" />,
      action: () => console.log("Export report"),
      variant: "outline" as const,
    },
    {
      title: "Lihat Analitik",
      description: "Analisis performa produk",
      icon: <BarChart3 className="h-5 w-5" />,
      action: () => console.log("View analytics"),
      variant: "outline" as const,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aksi Cepat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              onClick={action.action}
              className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent"
            >
              <div className="flex items-center space-x-2">
                {action.icon}
                <span className="font-medium">{action.title}</span>
              </div>
              <span className="text-xs text-muted-foreground text-left">{action.description}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
