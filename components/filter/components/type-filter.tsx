"use client";
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible,CollapsibleTrigger ,CollapsibleContent} from '@/components/ui/collapsible';
import { useTypeStore } from '@/store/useTypeStore';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import React, { useState } from 'react'

const seasons = [
  {
    title :"TV" 
  },
  {
    title :"MOVIE" 
  }, 
]

const TypeFilter = () => {

    const [isOpen, setIsOpen] =useState(true)
    const {type,setType,reset} = useTypeStore()
    const handleSeasonChange = (selectedType: 'TV' | 'MOVIE' ) => {
      // Toggle season if the same one is selected again
      if (type === selectedType) {
        // Reset to null/undefined when clicking the same season
        setType('');
      } else {
        setType(selectedType);
      }
    }
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
    <CollapsibleTrigger className="flex items-center justify-between w-full">
      <h3 className="text-lg font-semibold">Type</h3>
      <div className='space-x-2 flex items-center'>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
  
    </CollapsibleTrigger>
    {/* <RotateCcw size={15} onClick={resetButton} /> */}
    <CollapsibleContent className="mt-2 space-y-2">
    {
      seasons.map((el) => (
        <div key={el.title} className="flex items-center space-x-2">
        <Checkbox
          id={`season-${el.title}`}
          checked={type == el.title}
          onCheckedChange={() => handleSeasonChange(el.title as 'TV' | 'MOVIE')}
        />
        <label
          htmlFor={`season-${el.title}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {el.title}
        </label>
      </div>
      ))
    }
  

    </CollapsibleContent>
  </Collapsible>
  )
}

export default TypeFilter
