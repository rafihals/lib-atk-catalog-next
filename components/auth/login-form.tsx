"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Eye, EyeOff, Loader2, Sparkles } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email wajib diisi"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // TODO: Implement actual authentication logic
      console.log("Login attempt:", formData)
      // Redirect to admin dashboard or home page
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 animate-gradient-shift"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-xl animate-float-slow"></div>

      <Card className="w-full max-w-md relative z-10 glass-card border-0 shadow-2xl backdrop-blur-xl bg-white/80">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-cyan-600 p-4 rounded-2xl">
                <ShoppingBag className="h-12 w-12 text-white" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Admin Login
          </CardTitle>
          <CardDescription className="text-slate-600 text-base">Masuk ke dashboard admin ATK Catalog</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@atkcatalog.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`h-12 border-2 transition-all duration-300 focus:scale-[1.02] ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 bg-red-50/50"
                    : "border-slate-200 focus:border-indigo-500 hover:border-slate-300 bg-white/70 backdrop-blur-sm"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`h-12 border-2 pr-12 transition-all duration-300 focus:scale-[1.02] ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 bg-red-50/50"
                      : "border-slate-200 focus:border-indigo-500 hover:border-slate-300 bg-white/70 backdrop-blur-sm"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-4 hover:bg-indigo-50 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-500" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-3 py-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                className="border-2 border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
              <Label htmlFor="remember" className="text-sm font-medium text-slate-700 cursor-pointer">
                Ingat saya
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-6 pt-2">
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <span>Masuk</span>
                  <Sparkles className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <div className="text-center space-y-3">
              <Link
                href="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors duration-200"
              >
                Lupa password?
              </Link>
              <p className="text-sm text-slate-600">
                Belum punya akun?{" "}
                <Link
                  href="/register"
                  className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors duration-200"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
