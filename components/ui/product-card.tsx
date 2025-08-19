"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StockBadge } from "@/components/ui/stock-badge"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  image_url?: string
  category: string
  brand?: string
}

interface ProductCardProps {
  product: Product
  onViewDetails?: (product: Product) => void
  className?: string
}

export function ProductCard({ product, onViewDetails, className }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card
      className={cn("group overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]", className)}
    >
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image_url || `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="mb-2">
            <StockBadge stock={product.stock} />
          </div>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{product.name}</h3>
          {product.brand && <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>}
          <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => onViewDetails?.(product)} className="w-full" variant="outline">
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  )
}
