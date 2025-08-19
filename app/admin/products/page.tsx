"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { ProductTable } from "@/components/admin/product-table"
import { ProductForm } from "@/components/admin/product-form"
import { ProductDetailModal } from "@/components/catalog/product-detail-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsFormOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsDetailOpen(true)
  }

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveProduct = (productData: Partial<Product>) => {
    // TODO: Implement actual save logic
    console.log("Saving product:", productData)
    setIsFormOpen(false)
    setSelectedProduct(null)
  }

  const handleConfirmDelete = () => {
    if (productToDelete) {
      // TODO: Implement actual delete logic
      console.log("Deleting product:", productToDelete.id)
      setIsDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  return (
    <AdminLayout title="Manajemen Produk" description="Kelola produk dalam katalog ATK">
      <ProductTable
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onViewProduct={handleViewProduct}
      />

      {/* Product Form Modal */}
      <ProductForm
        product={selectedProduct}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedProduct(null)
        }}
        onSave={handleSaveProduct}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false)
          setSelectedProduct(null)
        }}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Produk</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus produk "{productToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}
