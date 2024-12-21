"use client"

import React ,{Suspense ,useState,useEffect} from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

import {
  Sheet,
  SheetContent,
  SheetHeader, 
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { useGetGenres } from "@/hooks/useGetGenres"
import GenreFilter from "./components/genres"
import { useGenresStore } from "@/store/useGenreStore"
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
          <SheetTitle className="text-xl font-semibold mb-4"> Filters
          </SheetTitle>
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

