"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, X } from "lucide-react"
import { categories } from "@/lib/sample-data"

interface FilterState {
  search: string
  category: string
  minPrice: string
  maxPrice: string
  inStock: boolean
  sortBy: string
}

interface SearchFilterPanelProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
  className?: string
}

export function SearchFilterPanel({ filters, onFiltersChange, onClearFilters, className }: SearchFilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateFilter = (key: keyof FilterState, value: string | boolean) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Kategori</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all-categories"
              checked={filters.category === ""}
              onCheckedChange={() => updateFilter("category", "")}
            />
            <Label htmlFor="all-categories" className="text-sm font-normal">
              Semua Kategori
            </Label>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.category === category.name}
                onCheckedChange={() =>
                  updateFilter("category", filters.category === category.name ? "" : category.name)
                }
              />
              <Label htmlFor={`category-${category.id}`} className="text-sm font-normal">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Rentang Harga</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="min-price" className="text-xs text-muted-foreground">
              Minimum
            </Label>
            <Input
              id="min-price"
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="max-price" className="text-xs text-muted-foreground">
              Maksimum
            </Label>
            <Input
              id="max-price"
              type="number"
              placeholder="1000000"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Stock Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Ketersediaan</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStock}
            onCheckedChange={(checked) => updateFilter("inStock", checked as boolean)}
          />
          <Label htmlFor="in-stock" className="text-sm font-normal">
            Hanya yang tersedia
          </Label>
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={onClearFilters} className="w-full bg-transparent">
        <X className="mr-2 h-4 w-4" />
        Hapus Filter
      </Button>
    </div>
  )

  return (
    <div className={className}>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari produk..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10 pr-4"
          />
        </div>
      </div>

      {/* Sort and Mobile Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Label htmlFor="sort" className="text-sm font-medium">
            Urutkan:
          </Label>
          <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
            <SelectTrigger id="sort" className="w-[180px]">
              <SelectValue placeholder="Pilih urutan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Nama A-Z</SelectItem>
              <SelectItem value="name-desc">Nama Z-A</SelectItem>
              <SelectItem value="price-asc">Harga Terendah</SelectItem>
              <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
              <SelectItem value="newest">Terbaru</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Filter Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filter Produk</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
