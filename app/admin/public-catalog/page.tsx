"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/ui/product-card"
import { SearchFilterPanel } from "@/components/catalog/search-filter-panel"
import { ProductDetailModal } from "@/components/catalog/product-detail-modal"
import { sampleProducts } from "@/lib/sample-data"
import { Eye, Edit, Trash2, Plus, ToggleLeft, ToggleRight } from "lucide-react"

export default function AdminPublicCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState(sampleProducts.map((p) => ({ ...p, isPublished: true })))

  const togglePublishStatus = (productId: string) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isPublished: !p.isPublished } : p)))
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <AdminLayout title="Public Catalog Management" description="Kelola katalog produk yang ditampilkan ke publik">
      <div className="space-y-8 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl text-white shadow-xl">
          <div>
            <h2 className="text-2xl font-bold mb-2">Public Catalog Overview</h2>
            <p className="text-blue-100">Manage what customers see in the public catalog</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Published Products</p>
                  <p className="text-3xl font-bold">{products.filter((p) => p.isPublished).length}</p>
                </div>
                <Eye className="w-8 h-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Draft Products</p>
                  <p className="text-3xl font-bold">{products.filter((p) => !p.isPublished).length}</p>
                </div>
                <Edit className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Categories</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">C</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Low Stock Items</p>
                  <p className="text-3xl font-bold">{products.filter((p) => p.stock < 10).length}</p>
                </div>
                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6">
          {showFilters && (
            <div className="lg:w-80 animate-slide-right">
              <SearchFilterPanel
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-slate-800">Products ({filteredProducts.length})</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Bulk Edit
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard product={product} onClick={() => setSelectedProduct(product)} />

                  {/* Admin Overlay */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant={product.isPublished ? "default" : "secondary"}
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg"
                      onClick={() => togglePublishStatus(product.id)}
                    >
                      {product.isPublished ? (
                        <ToggleRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant={product.isPublished ? "default" : "secondary"}
                      className={`${
                        product.isPublished ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"
                      } text-white shadow-lg`}
                    >
                      {product.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>

                  {/* Admin Actions */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg">
                      <Eye className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg">
                      <Edit className="w-4 h-4 text-orange-600" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No products found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </AdminLayout>
  )
}
