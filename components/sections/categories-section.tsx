"use client"

import type React from "react"

import { CategoryCard } from "@/components/ui/category-card"
import { categories, sampleProducts } from "@/lib/sample-data"
import { PenTool, Highlighter, BookOpen, FolderOpen, FileText, Paperclip, Grid3X3 } from "lucide-react"

export function CategoriesSection() {
  const getCategoryIcon = (categoryName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "Pulpen & Pensil": <PenTool className="h-8 w-8" />,
      "Spidol & Marker": <Highlighter className="h-8 w-8" />,
      "Buku & Notes": <BookOpen className="h-8 w-8" />,
      "Map & Folder": <FolderOpen className="h-8 w-8" />,
      "Kertas & Amplop": <FileText className="h-8 w-8" />,
      "Perlengkapan Kantor": <Paperclip className="h-8 w-8" />,
    }
    return iconMap[categoryName] || <Paperclip className="h-8 w-8" />
  }

  const getCategoryCount = (categoryName: string) => {
    return sampleProducts.filter((product) => product.category === categoryName).length
  }

  const handleCategoryClick = (categoryName: string) => {
    // TODO: Navigate to catalog with category filter
    console.log("Navigate to category:", categoryName)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 relative">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #6366f1 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm font-medium mb-6">
            <Grid3X3 className="h-4 w-4" />
            <span>Kategori Lengkap</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Kategori Produk
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Jelajahi berbagai kategori alat tulis dan perlengkapan kantor sesuai kebutuhan spesifik Anda
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="transform hover:scale-110 transition-all duration-300 hover:z-10 relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategoryCard
                name={category.name}
                icon={getCategoryIcon(category.name)}
                itemCount={getCategoryCount(category.name)}
                onClick={() => handleCategoryClick(category.name)}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full border-2 border-white" />
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white" />
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full border-2 border-white" />
            </div>
            <span className="text-slate-700 font-medium">1000+ Produk Berkualitas</span>
          </div>
        </div>
      </div>
    </section>
  )
}
