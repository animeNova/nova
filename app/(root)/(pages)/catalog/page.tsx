"use client";
import AnimeCard from '@/components/cards/AnimeCard'
import SidebarFilter from '@/components/filter/Filter'
import { Button } from '@/components/ui/button'
import OrderbyFilter from '@/components/ui/orderbyFilter'
import React, { useEffect } from 'react';
import Wrapper from './wrapper';
import { useGetShows } from '@/hooks/useGetShows'
import CardSkeleton from '@/components/cardSkeleton/CardSkeleton';
import useFilterValues from '@/hooks/useFilterValues';

const page = () => {
  const {season,genres,order} = useFilterValues()
  const {data,isLoading,refetch,isRefetching} = useGetShows({
    limit : 20 ,
    page :1 ,
    orderBy : order,
    season : season ,
    genres : genres
  })

  useEffect(() => {
    refetch()  
  },[page,season,order,genres])


  return (
    <Wrapper>
    <div className='space-y-6'>
     <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-semibold uppercase'>Catalog</h1>
        <div className='flex justify-center items-center gap-2'>
        <OrderbyFilter />
        <SidebarFilter />
        </div>
   
     </div>
    {isLoading || isRefetching ? (
      <CardSkeleton count={14} />
    ) : (
      <div className='flex-wrap flex justify-center items-center gap-4 md:gap-14'>
      {
        data?.result.map((show) => (
          <AnimeCard id={show.id} image={show.image} video={show.video} title={show.title} year={show.airing} key={show.id}  />
        ))
      }
    </div>
    )}

    {
      data?.hasNextPage && (
      <div>
        <Button className='w-full text-lg' variant={'secondary'}>Show More</Button>
      </div>
      ) 
    }
   
    </div>
    </Wrapper>
  )
}

export default page
