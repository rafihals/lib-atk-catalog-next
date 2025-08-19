"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  name: string
  icon: React.ReactNode
  itemCount: number
  onClick?: () => void
  className?: string
}

export function CategoryCard({ name, icon, itemCount, onClick, className }: CategoryCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:bg-accent/50",
        className,
      )}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-3 text-primary">{icon}</div>
        <h3 className="font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{itemCount} produk</p>
      </CardContent>
    </Card>
  )
}
