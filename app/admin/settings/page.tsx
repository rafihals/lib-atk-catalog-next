"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Camera, Save, X, CheckCircle, AlertCircle, Home, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  fullName: string
  email: string
  phone: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
  profilePicture: File | null
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
}

export default function SettingsPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "Admin User",
    email: "admin@atkcatalog.com",
    phone: "+62 812 3456 7890",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePicture: null,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [profilePreview, setProfilePreview] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap harus diisi"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Nama lengkap minimal 2 karakter"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    // Phone validation (Indonesian format)
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Format nomor telepon tidak valid"
    }

    // Password validation
    if (formData.newPassword || formData.currentPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Password saat ini harus diisi"
      }
      if (formData.newPassword && formData.newPassword.length < 6) {
        newErrors.newPassword = "Password baru minimal 6 karakter"
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Konfirmasi password tidak sama"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }))
      const reader = new FileReader()
      reader.onload = () => setProfilePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setShowSuccess(true)
      // Reset password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      fullName: "Admin User",
      email: "admin@atkcatalog.com",
      phone: "+62 812 3456 7890",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      profilePicture: null,
    })
    setErrors({})
    setProfilePreview(null)
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <AdminLayout title="Profile Settings" description="Manage your account information and preferences">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Dashboard</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-800 font-medium">Profile Settings</span>
        </nav>

        {/* Success Notification */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-top-2">
            <CheckCircle className="h-5 w-5" />
            <span>Profile berhasil diperbarui</span>
          </div>
        )}

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Profile Settings
            </CardTitle>
            <CardDescription className="text-slate-600">
              Manage your account information and preferences
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Picture Section */}
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-4 border-gradient-to-r from-blue-400 to-indigo-500">
                    <AvatarImage src={profilePreview || "/admin-interface.png"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl font-bold">
                      {formData.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-slate-800">Profile Picture</h3>
                  <p className="text-sm text-slate-500 mb-3">Upload a new profile picture</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="profile-picture"
                  />
                  <Label
                    htmlFor="profile-picture"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all cursor-pointer"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Label>
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className={cn(
                      "w-full transition-all duration-200",
                      errors.fullName
                        ? "border-red-300 ring-2 ring-red-500 bg-red-50"
                        : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
                    )}
                  />
                  {errors.fullName && (
                    <div className="flex items-center space-x-1 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="nama@email.com"
                    className={cn(
                      "w-full transition-all duration-200",
                      errors.email
                        ? "border-red-300 ring-2 ring-red-500 bg-red-50"
                        : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
                    )}
                  />
                  {errors.email && (
                    <div className="flex items-center space-x-1 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                  <p className="text-xs text-slate-500">Email akan digunakan untuk login dan notifikasi</p>
                </div>

                {/* Phone Number */}
                <div className="space-y-2 lg:col-span-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                    Nomor Telepon
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+62 812 3456 7890"
                    className={cn(
                      "w-full transition-all duration-200",
                      errors.phone
                        ? "border-red-300 ring-2 ring-red-500 bg-red-50"
                        : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
                    )}
                  />
                  {errors.phone && (
                    <div className="flex items-center space-x-1 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Password Change Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">Ubah Password</h3>
                  <p className="text-sm text-slate-500">Kosongkan jika tidak ingin mengubah password</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Current Password */}
                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="currentPassword" className="text-sm font-medium text-slate-700">
                      Password Saat Ini
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                        placeholder="Masukkan password saat ini"
                        className={cn(
                          "w-full pr-10 transition-all duration-200",
                          errors.currentPassword
                            ? "border-red-300 ring-2 ring-red-500 bg-red-50"
                            : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                        onClick={() => togglePasswordVisibility("current")}
                      >
                        {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.currentPassword && (
                      <div className="flex items-center space-x-1 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.currentPassword}</span>
                      </div>
                    )}
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium text-slate-700">
                      Password Baru
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange("newPassword", e.target.value)}
                        placeholder="Masukkan password baru"
                        className={cn(
                          "w-full pr-10 transition-all duration-200",
                          errors.newPassword
                            ? "border-red-300 ring-2 ring-red-500 bg-red-50"
                            : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                        onClick={() => togglePasswordVisibility("new")}
                      >
                        {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.newPassword && (
                      <div className="flex items-center space-x-1 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.newPassword}</span>
                      </div>
                    )}
                    <p className="text-xs text-slate-500">Minimal 6 karakter</p>
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                      Konfirmasi Password Baru
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Ulangi password baru"
                        className={cn(
                          "w-full pr-10 transition-all duration-200",
                          errors.confirmPassword
                            ? "border-red-300 ring-2 ring-red-500 bg-red-50"
                            : formData.newPassword &&
                                formData.confirmPassword &&
                                formData.newPassword === formData.confirmPassword
                              ? "border-emerald-300 ring-2 ring-emerald-500 bg-emerald-50"
                              : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                        onClick={() => togglePasswordVisibility("confirm")}
                      >
                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="flex items-center space-x-1 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.confirmPassword}</span>
                      </div>
                    )}
                    {formData.newPassword &&
                      formData.confirmPassword &&
                      formData.newPassword === formData.confirmPassword && (
                        <div className="flex items-center space-x-1 text-sm text-emerald-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Password cocok</span>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Perubahan
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-lg font-medium transition-all duration-200 bg-transparent"
                >
                  <X className="h-4 w-4 mr-2" />
                  Batal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-white/75 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
              <span className="text-slate-700 font-medium">Menyimpan perubahan...</span>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
