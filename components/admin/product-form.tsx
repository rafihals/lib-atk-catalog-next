"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, X, Loader2 } from "lucide-react"
import { categories } from "@/lib/sample-data"

interface Product {
  id: string
  name: string
  description: string
  category: string
  brand?: string
  price: number
  stock: number
  image_url?: string
  sku: string
  is_active: boolean
}

interface ProductFormProps {
  product?: Product | null
  isOpen: boolean
  onClose: () => void
  onSave: (product: Partial<Product>) => void
}

export function ProductForm({ product, isOpen, onClose, onSave }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    image_url: "",
    sku: "",
    is_active: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when product changes or modal opens/closes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand || "",
        price: product.price.toString(),
        stock: product.stock.toString(),
        image_url: product.image_url || "",
        sku: product.sku,
        is_active: product.is_active,
      })
      setImagePreview(product.image_url || null)
    } else {
      setFormData({
        name: "",
        description: "",
        category: "",
        brand: "",
        price: "",
        stock: "",
        image_url: "",
        sku: "",
        is_active: true,
      })
      setImagePreview(null)
    }
    setErrors({})
  }, [product, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nama produk wajib diisi"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Deskripsi produk wajib diisi"
    }

    if (!formData.category) {
      newErrors.category = "Kategori wajib dipilih"
    }

    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Harga harus lebih dari 0"
    }

    if (!formData.stock || Number.parseInt(formData.stock) < 0) {
      newErrors.stock = "Stok tidak boleh negatif"
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU wajib diisi"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, image_url: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const productData: Partial<Product> = {
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        id: product?.id || Date.now().toString(),
      }

      onSave(productData)
      onClose()
    } catch (error) {
      console.error("Error saving product:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Produk" : "Tambah Produk Baru"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Produk *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                  placeholder="Masukkan nama produk"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={errors.description ? "border-destructive" : ""}
                  placeholder="Masukkan deskripsi produk"
                  rows={3}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  placeholder="Masukkan brand produk"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Harga *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={errors.price ? "border-destructive" : ""}
                    placeholder="0"
                    min="0"
                    step="1000"
                  />
                  {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stok *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    className={errors.stock ? "border-destructive" : ""}
                    placeholder="0"
                    min="0"
                  />
                  {errors.stock && <p className="text-sm text-destructive">{errors.stock}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  className={errors.sku ? "border-destructive" : ""}
                  placeholder="Masukkan SKU produk"
                />
                {errors.sku && <p className="text-sm text-destructive">{errors.sku}</p>}
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Gambar Produk</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setImagePreview(null)
                          setFormData((prev) => ({ ...prev, image_url: "" }))
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <div className="mt-2">
                        <Label htmlFor="image-upload" className="cursor-pointer text-primary hover:underline">
                          Klik untuk upload gambar
                        </Label>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG hingga 2MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Produk"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
