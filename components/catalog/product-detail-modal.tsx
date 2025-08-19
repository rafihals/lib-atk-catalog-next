"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StockBadge } from "@/components/ui/stock-badge"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2 } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image_url?: string
  category: string
  brand?: string
  sku: string
}

interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!product) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Detail Produk</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={
                  product.image_url || `/placeholder.svg?height=500&width=500&query=${encodeURIComponent(product.name)}`
                }
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="space-y-1">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
                  {product.brand && <p className="text-muted-foreground">{product.brand}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                <StockBadge stock={product.stock} />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Deskripsi Produk</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-foreground">SKU:</span>
                  <span className="text-muted-foreground ml-2">{product.sku}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">Kategori:</span>
                  <span className="text-muted-foreground ml-2">{product.category}</span>
                </div>
                {product.brand && (
                  <div>
                    <span className="font-medium text-foreground">Brand:</span>
                    <span className="text-muted-foreground ml-2">{product.brand}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-foreground">Stok:</span>
                  <span className="text-muted-foreground ml-2">{product.stock} unit</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Informasi Pemesanan</h4>
                <p className="text-sm text-muted-foreground">
                  Untuk melakukan pemesanan produk ini, silakan hubungi tim sales kami melalui kontak yang tersedia atau
                  kunjungi toko fisik kami.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" disabled={product.stock === 0}>
                  {product.stock === 0 ? "Stok Habis" : "Hubungi Sales"}
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Tanya Produk
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
