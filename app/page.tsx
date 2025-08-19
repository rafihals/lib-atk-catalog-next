import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedProductsSection } from "@/components/sections/featured-products-section"
import { CategoriesSection } from "@/components/sections/categories-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProductsSection />
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  )
}
