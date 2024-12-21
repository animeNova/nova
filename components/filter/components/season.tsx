"use client";
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible,CollapsibleTrigger ,CollapsibleContent} from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSeasonStore } from '@/store/useSeasonStore';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import React, { useState } from 'react'

const seasons = [
  {
    title :"summer" 
  },
  {
    title :"spring" 
  },
  {
    title :"winter" 
  },
  {
    title :"fall" 
  },
]

const SeasonFilter = () => {

    const [isOpen, setIsOpen] =useState(true)
    const {season,setSeason,reset} = useSeasonStore()
    const handleSeasonChange = (season: 'spring' | 'summer' | 'fall' | 'winter') => {
      setSeason(season)
    }
    const resetButton = () => {
      reset()
      setIsOpen(false)
    }
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
    <CollapsibleTrigger className="flex items-center justify-between w-full">
      <h3 className="text-lg font-semibold">Season</h3>
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
          checked={season == el.title}
          onCheckedChange={() => handleSeasonChange(el.title as 'spring' | 'summer' | 'fall' | 'winter')}
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

export default SeasonFilter
