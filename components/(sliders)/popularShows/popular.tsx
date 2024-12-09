import React from 'react'
import Header from '../../ui/header'
import AnimeCard from '../../cards/AnimeCard'
import { Button } from '../../ui/button'

const Popular = () => {
  return (
    <div className='flex flex-col gap-5'>
      <Header title='Most Popular' />
      <div className='flex justify-center items-center gap-4 md:gap-12 flex-wrap w-full'>
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
        <AnimeCard />
        <AnimeCard />
      </div>
      <Button className='w-full bg-black dark:bg-white/85 text-secondary p-2 text-xl font-bold hover:bg-white/80 font-archivo ' >Show More</Button>
    </div>
  )
}

export default Popular
