import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StockBadgeProps {
  stock: number
  lowStockThreshold?: number
  className?: string
}

export function StockBadge({ stock, lowStockThreshold = 10, className }: StockBadgeProps) {
  const getStockStatus = () => {
    if (stock === 0) {
      return { variant: "destructive" as const, text: "Habis" }
    } else if (stock <= lowStockThreshold) {
      return { variant: "warning" as const, text: `Stok Sedikit (${stock})` }
    } else {
      return { variant: "success" as const, text: `Tersedia (${stock})` }
    }
  }

  const { variant, text } = getStockStatus()

  return (
    <Badge variant={variant} className={cn("text-xs font-medium", className)}>
      {text}
    </Badge>
  )
}
