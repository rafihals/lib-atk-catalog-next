"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SearchFilterPanel } from "@/components/catalog/search-filter-panel"
import { ProductGrid } from "@/components/catalog/product-grid"
import { ProductDetailModal } from "@/components/catalog/product-detail-modal"
import { sampleProducts } from "@/lib/sample-data"

interface FilterState {
  search: string
  category: string
  minPrice: string
  maxPrice: string
  inStock: boolean
  sortBy: string
}

const PRODUCTS_PER_PAGE = 12

export default function CatalogPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    inStock: false,
    sortBy: "name-asc",
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...sampleProducts]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.brand?.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm),
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter((product) => product.price >= Number.parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((product) => product.price <= Number.parseInt(filters.maxPrice))
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.stock > 0)
    }

    // Sort products
    switch (filters.sortBy) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    return filtered
  }, [filters])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  )

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  const handleFiltersChange = (newFilters: FilterState) => {
    setIsLoading(true)
    setFilters(newFilters)
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300)
  }

  const handleClearFilters = () => {
    setFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      inStock: false,
      sortBy: "name-asc",
    })
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                <span>Katalog Lengkap</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Katalog Produk</h1>
              <p className="text-xl text-white/80 mb-6">
                Temukan berbagai alat tulis dan perlengkapan kantor berkualitas dengan teknologi pencarian canggih
              </p>

              {/* Enhanced stats */}
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-medium">{filteredProducts.length} Produk Tersedia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                  <span className="font-medium">6 Kategori</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  <span className="font-medium">Harga Terbaik</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filter Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <SearchFilterPanel
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </div>

              {/* Product Grid */}
              <div className="lg:col-span-3">
                <ProductGrid
                  products={paginatedProducts}
                  isLoading={isLoading}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  onProductClick={handleProductClick}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
