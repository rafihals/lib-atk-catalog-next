"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  Warehouse,
  FolderOpen,
  Users,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Eye,
  Settings,
} from "lucide-react"

interface AdminSidebarProps {
  className?: string
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Public Catalog", href: "/admin/public-catalog", icon: Eye }, // Added Public Catalog menu item
    { name: "Produk", href: "/admin/products", icon: Package },
    { name: "Stok", href: "/admin/stock", icon: Warehouse },
    { name: "Kategori", href: "/admin/categories", icon: FolderOpen },
    { name: "Pengguna", href: "/admin/users", icon: Users },
    { name: "Laporan", href: "/admin/reports", icon: BarChart3 },
    { name: "Pengaturan", href: "/admin/settings", icon: Settings }, // Added Settings menu item to sidebar navigation
  ]

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked")
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 border-r border-white/10 transition-all duration-300 shadow-2xl",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              ATK Admin
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="p-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full">
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarImage src="/admin-interface.png" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-blue-200 truncate">admin@atkcatalog.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                    : "text-blue-100 hover:bg-white/10 hover:text-white hover:transform hover:scale-105",
                  isCollapsed && "justify-center",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-all duration-200",
                    isActive ? "text-white" : "text-blue-300 group-hover:text-white",
                  )}
                />
                {!isCollapsed && <span className="font-medium">{item.name}</span>}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-xl blur-xl -z-10" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start text-red-200 hover:bg-red-500/20 hover:text-red-100 transition-all duration-200 rounded-xl py-3",
            isCollapsed && "justify-center px-2",
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3 font-medium">Keluar</span>}
        </Button>
      </div>
    </div>
  )
}
