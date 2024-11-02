"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { useEffect, useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Label } from "../ui/label"
const categories = [
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "books", name: "Books" },
  { id: "home", name: "Home & Garden" },
  { id: "toys", name: "Toys" },
  { id: "sports", name: "Sports" },
  { id: "beauty", name: "Beauty" },
  { id: "automotive", name: "Automotive" },
  { id: "jewelry", name: "Jewelry" },
]

const priceRanges = [
  { id: "under-25", name: "Under $25" },
  { id: "25-50", name: "$25 to $50" },
  { id: "50-100", name: "$50 to $100" },
  { id: "100-200", name: "$100 to $200" },
  { id: "over-200", name: "Over $200" },
]


export default function SidebarFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(true)
  const [isPriceOpen, setIsPriceOpen] = React.useState(true)

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    searchParams.get("categories")?.split(",") || []
  )
  const [selectedPriceRanges, setSelectedPriceRanges] = React.useState<string[]>(
    searchParams.get("prices")?.split(",") || []
  )
  
  const updateQueryParams = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","))
    } else {
      params.delete("categories")
    }
    if (selectedPriceRanges.length > 0) {
      params.set("prices", selectedPriceRanges.join(","))
    } else {
      params.delete("prices")
    }
    router.push(`?${params.toString()}`)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handlePriceRangeChange = (priceRangeId: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(priceRangeId)
        ? prev.filter(id => id !== priceRangeId)
        : [...prev, priceRangeId]
    )
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
        <Filter className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        </SheetHeader>
        <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">Categories</h3>
              {isCategoryOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">Price Range</h3>
              {isPriceOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              {priceRanges.map((range) => (
                <div key={range.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`price-${range.id}`}
                    checked={selectedPriceRanges.includes(range.id)}
                    onCheckedChange={() => handlePriceRangeChange(range.id)}
                  />
                  <label
                    htmlFor={`price-${range.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {range.name}
                  </label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Button onClick={updateQueryParams} className="w-full">
            Apply Filters
          </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  
  )
}

