"use client"

import { ProductCard } from "@/components/ui/product-card"
import { sampleProducts } from "@/lib/sample-data"
import { Sparkles, TrendingUp } from "lucide-react"

export function FeaturedProductsSection() {
  // Get first 6 products as featured
  const featuredProducts = sampleProducts.slice(0, 6)

  const handleViewDetails = (product: any) => {
    // TODO: Navigate to product detail page
    console.log("View details for:", product.name)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Enhanced header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Paling Diminati</span>
            <Sparkles className="h-4 w-4" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Produk Unggulan
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Pilihan terbaik alat tulis dan perlengkapan kantor yang paling diminati pelanggan dengan kualitas premium
          </p>
        </div>

        {/* Enhanced product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} onViewDetails={handleViewDetails} />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <span className="text-lg font-medium">Lihat Semua Produk</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
