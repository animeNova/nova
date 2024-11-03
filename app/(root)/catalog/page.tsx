import AnimeCard from '@/components/cards/AnimeCard'
import SidebarFilter from '@/components/filter/Filter'
import { Button } from '@/components/ui/button'
import OrderbyFilter from '@/components/ui/orderbyFilter'
import React from 'react'

const page = () => {
  return (
    <div className='space-y-6'>
     <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-semibold uppercase'>Catalog</h1>
        <div className='flex justify-center items-center gap-2'>
        <OrderbyFilter />
        <SidebarFilter />
        </div>
   
     </div>
  
    <div className='flex-wrap flex justify-center items-center gap-4 md:gap-14'>
      <AnimeCard />
      <AnimeCard />
      <AnimeCard />
      <AnimeCard />
      <AnimeCard />
      <AnimeCard />
      <AnimeCard />
      <AnimeCard />
      <AnimeCard />
      <AnimeCard />
      <AnimeCard />
      <AnimeCard />
    </div>
    <div>
      <Button className='w-full text-lg' variant={'secondary'}>Show More</Button>
    </div>
    </div>
  )
}

export default page
