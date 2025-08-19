import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500" />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-24 h-24 bg-pink-400/15 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-12 h-12 bg-green-400/20 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-white/90 text-sm font-medium animate-pulse-glow">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span>Solusi Terpercaya Sejak 2020</span>
            <Star className="h-4 w-4 text-yellow-300" />
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            <span className="text-white">Solusi Kebutuhan</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              Kantor Anda
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Temukan berbagai alat tulis dan perlengkapan kantor berkualitas dengan harga terbaik. Lengkapi kebutuhan
            bisnis dan personal Anda dengan produk terpercaya.
          </p>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button
              size="lg"
              asChild
              className="btn-gradient text-white text-lg px-10 py-6 rounded-full shadow-2xl border-0 hover:scale-105 transition-all duration-300"
            >
              <Link href="/catalog" className="flex items-center space-x-3">
                <span>Lihat Katalog Kami</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-10 py-6 rounded-full glass-effect text-white border-white/30 hover:bg-white/10 hover:scale-105 transition-all duration-300 bg-transparent"
            >
              <Link href="/about">Pelajari Lebih Lanjut</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-12 text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm">1000+ Produk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm">Pengiriman Cepat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-sm">Harga Terbaik</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
