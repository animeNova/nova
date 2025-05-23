"use client"

import React ,{Suspense} from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Sheet,
  SheetContent,
  SheetHeader, 
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet"
import {  Filter } from "lucide-react"
import GenreFilter from "./components/genres"

import SeasonFilter from "./components/season"
import TypeFilter from "./components/type-filter"



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
          <SheetTitle className="text-xl font-semibold mb-4"> Filters
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          <GenreFilter />
          <SeasonFilter />
          <TypeFilter />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
    </Suspense>
  )
}

