"use client";
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible,CollapsibleTrigger ,CollapsibleContent} from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSeasonStore } from '@/store/useSeasonStore';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SeasonFilter = () => {
    const searchParams = useSearchParams()
    const router = useRouter();

    const [isOpen, setIsOpen] =useState(true)
    const {season,setSeason,reset} = useSeasonStore()
    const handleCategoryChange = (season: 'spring' | 'summer' | 'fall' | 'winter') => {
      setSeason(season)
    }
    const resetButton = () => {
      reset()
      const params = new URLSearchParams(searchParams.toString());
        params.delete('season');
        router.push(`?${params.toString()}`);
        setIsOpen(false)
    }

    useEffect(() => {
      const season = searchParams.get('season') as 'spring' | 'summer' | 'fall' | 'winter';
      if (season) {
        setSeason(season)
      }
    },[searchParams,season])
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
    <CollapsibleTrigger className="flex items-center justify-between w-full">
      <h3 className="text-lg font-semibold">Season</h3>
      <div className='space-x-2 flex items-center'>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
  
    </CollapsibleTrigger>
    <RotateCcw size={15} onClick={resetButton} />
    <CollapsibleContent className="mt-2 space-y-2">
    <div>
    <Select onValueChange={handleCategoryChange} defaultValue={season} >
         
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select a season"  />
                  </SelectTrigger>
                <SelectContent className='w-full'>
                  <SelectItem value="summer">summer</SelectItem>
                  <SelectItem value="winter">winter</SelectItem>
                  <SelectItem value="spring">spring</SelectItem>
                  <SelectItem value="fall">fall</SelectItem>
                </SelectContent>
              </Select>
    </div>
    </CollapsibleContent>
  </Collapsible>
  )
}

export default SeasonFilter
