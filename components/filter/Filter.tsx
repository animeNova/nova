"use client"

import React ,{Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"


import {
  Sheet,
  SheetContent,
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
} from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import GenreFilter from "./components/genres"
import useFilterValues from "@/hooks/useFilterValues"
import SeasonFilter from "./components/season"



export default function SidebarFilter() {
  return (
    <Suspense>
  
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
        <Filter className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          <GenreFilter />
          <SeasonFilter />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
    
    </Suspense>
  )
}

