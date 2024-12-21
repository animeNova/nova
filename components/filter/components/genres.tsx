"use client";
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible,CollapsibleTrigger ,CollapsibleContent} from '@/components/ui/collapsible';
import { useGetGenres } from '@/hooks/useGetGenres';
import { useGenresStore } from '@/store/useGenreStore';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useEffect, useState } from 'react'



const GenreFilter = () => {
    const [isOpen, setIsOpen] =useState(true)
    const { genres, setGenre } = useGenresStore();

    const categorys = useGetGenres();
    const handleCategoryChange = (categoryId: string) => {
        setGenre(categoryId)
    }
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
    <CollapsibleTrigger className="flex items-center justify-between w-full">
      <h3 className="text-lg font-semibold">Categories</h3>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </CollapsibleTrigger>
    <CollapsibleContent className="mt-2 space-y-2">
      {categorys?.data?.map((category) => (
        <div key={category.id} className="flex items-center space-x-2">
          <Checkbox
            id={`category-${category.id}`}
            checked={genres.includes(category.id)}
            onCheckedChange={() => handleCategoryChange(category.id)}
          />
          <label
            htmlFor={`category-${category.title}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {category.title}
          </label>
        </div>
      ))}
    </CollapsibleContent>
  </Collapsible>

  )
}

export default GenreFilter
