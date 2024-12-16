"use client";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible,CollapsibleTrigger ,CollapsibleContent} from '@/components/ui/collapsible';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { MultiSelect } from '@/components/ui/multi-select';
import { MultiSelectV1 } from '@/components/ui/multi-select-v1-';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { useGetGenres } from '@/hooks/useGetGenres';
import { cn } from '@/lib/utils';
import { useGenreStore } from '@/store/useGenreStore';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Check, ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react'



const GenreFilter = () => {
    const [isOpen, setIsOpen] =useState(true)

    const { genres: selectedGenres, setGenres } = useGenreStore();

    const {data,isLoading} = useGetGenres();

   if(isLoading){
    return <p>Loading...</p>
   }
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
    <CollapsibleTrigger className="flex items-center justify-between w-full">
      <h3 className="text-lg font-semibold">Categories</h3>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </CollapsibleTrigger>
    <CollapsibleContent className="mt-2 space-y-2">
    <MultiSelect options={data?.map((cat) => ({
      value : cat.id ,
      label : cat.title
    }))!} defaultValue={selectedGenres.map((genres) => ({
      value : genres.id ,
      label : genres.title
    }))} onChange={(value) => setGenres(value.map((gen) => ({
      id : gen.value, 
      title : gen.label
    })))}  onSearch={() => {} }/>
    </CollapsibleContent>
  </Collapsible>

  )
}

export default GenreFilter
