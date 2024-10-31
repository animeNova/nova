"use client"

import { Check, ChevronDown, Filter } from "lucide-react"
import React , { useState ,useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

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
import { Separator } from "@radix-ui/react-dropdown-menu"
const categories = [
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "books", name: "Books" },
  { id: "home", name: "Home & Garden" },
]

const brands = [
  { id: "apple", name: "Apple" },
  { id: "samsung", name: "Samsung" },
  { id: "sony", name: "Sony" },
  { id: "lg", name: "LG" },
]

const colors = [
  { id: "black", name: "Black" },
  { id: "white", name: "White" },
  { id: "red", name: "Red" },
  { id: "blue", name: "Blue" },
]

export default function SidebarFilter() {
  const [priceRange, setPriceRange] = useState([0, 1000])
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
         <div>
     <FilterSection title="Category" items={categories} />
     <FilterSection title="Brand" items={brands} />
       <FilterSection title="Color" items={colors} />
       <Button className="w-full">Apply Filters</Button>
     </div>
      </SheetContent>
    </Sheet>
  
  )
}

function FilterSection({ title, items }) {
  const [open, setOpen] = React.useState(true)
  const [mounted,setMounted] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  useEffect(() => {
    setMounted(true)
  },[])
  if(!mounted){
    return null;
  }
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mb-4">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-0">
          <span className="text-lg font-medium">{title}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              open ? "transform rotate-180" : ""
            }`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2 mb-2">
            <Checkbox id={item.id} className="border-foreground " />
            <Label htmlFor={item.id} className="text-sm font-normal">
              {item.name}
            </Label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}