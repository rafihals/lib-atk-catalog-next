"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Loader2, Sparkles, UserPlus } from "lucide-react"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi"
    }

    if (!formData.email) {
      newErrors.email = "Email wajib diisi"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!formData.phone) {
      newErrors.phone = "Nomor telepon wajib diisi"
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Format nomor telepon tidak valid"
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok"
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Anda harus menyetujui syarat dan ketentuan"
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
      // TODO: Implement actual registration logic
      console.log("Registration attempt:", formData)
      // Redirect to login page or dashboard
    } catch (error) {
      console.error("Registration error:", error)
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-indigo-50 animate-gradient-shift"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-gradient-to-r from-emerald-400/20 to-indigo-400/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-36 h-36 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-full blur-xl animate-float-delayed"></div>
      <div className="absolute top-1/3 right-20 w-20 h-20 bg-gradient-to-r from-amber-400/20 to-emerald-400/20 rounded-full blur-xl animate-float-slow"></div>
      <div className="absolute bottom-1/3 left-16 w-24 h-24 bg-gradient-to-r from-cyan-400/20 to-indigo-400/20 rounded-full blur-xl animate-float"></div>

      <Card className="w-full max-w-md relative z-10 glass-card border-0 shadow-2xl backdrop-blur-xl bg-white/80">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-emerald-600 to-indigo-600 p-4 rounded-2xl">
                <UserPlus className="h-12 w-12 text-white" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Daftar Akun
          </CardTitle>
          <CardDescription className="text-slate-600 text-base">
            Buat akun baru untuk mengakses ATK Catalog
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-700 font-medium">
                Nama Lengkap
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`h-11 border-2 transition-all duration-300 focus:scale-[1.02] ${
                  errors.fullName
                    ? "border-red-300 focus:border-red-500 bg-red-50/50"
                    : "border-slate-200 focus:border-emerald-500 hover:border-slate-300 bg-white/70 backdrop-blur-sm"
                }`}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`h-11 border-2 transition-all duration-300 focus:scale-[1.02] ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 bg-red-50/50"
                    : "border-slate-200 focus:border-emerald-500 hover:border-slate-300 bg-white/70 backdrop-blur-sm"
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
              <Label htmlFor="phone" className="text-slate-700 font-medium">
                Nomor Telepon
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+62 812 3456 7890"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`h-11 border-2 transition-all duration-300 focus:scale-[1.02] ${
                  errors.phone
                    ? "border-red-300 focus:border-red-500 bg-red-50/50"
                    : "border-slate-200 focus:border-emerald-500 hover:border-slate-300 bg-white/70 backdrop-blur-sm"
                }`}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.phone}
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
                  placeholder="Minimal 6 karakter"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`h-11 border-2 pr-12 transition-all duration-300 focus:scale-[1.02] ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 bg-red-50/50"
                      : "border-slate-200 focus:border-emerald-500 hover:border-slate-300 bg-white/70 backdrop-blur-sm"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-emerald-50 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-500" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">
                Konfirmasi Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ulangi password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`h-11 border-2 pr-12 transition-all duration-300 focus:scale-[1.02] ${
                    errors.confirmPassword
                      ? "border-red-300 focus:border-red-500 bg-red-50/50"
                      : "border-slate-200 focus:border-emerald-500 hover:border-slate-300 bg-white/70 backdrop-blur-sm"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-emerald-50 transition-colors duration-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-500" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-3 py-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  className="mt-1 border-2 border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                />
                <Label htmlFor="terms" className="text-sm font-medium text-slate-700 leading-relaxed cursor-pointer">
                  Saya menyetujui{" "}
                  <Link
                    href="/terms"
                    className="text-emerald-600 hover:text-emerald-800 font-semibold hover:underline transition-colors duration-200"
                  >
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link
                    href="/privacy"
                    className="text-emerald-600 hover:text-emerald-800 font-semibold hover:underline transition-colors duration-200"
                  >
                    Kebijakan Privasi
                  </Link>
                </Label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.acceptTerms}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-5 pt-2">
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <span>Daftar Sekarang</span>
                  <Sparkles className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <p className="text-center text-sm text-slate-600">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-emerald-600 hover:text-emerald-800 font-semibold hover:underline transition-colors duration-200"
              >
                Masuk di sini
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
