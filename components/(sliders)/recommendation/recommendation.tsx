"use client";
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Header from '@/components/ui/header';
import { user, useSession } from '@/app/lib/auth/client';
import { useGetRecommendation } from '@/hooks/useGetRecommendation';
import AnimeCard from '@/components/cards/AnimeCard';

const Recommendation = () => {
    const {data : user} = useSession()
    const {data} = useGetRecommendation()

    if(!user?.session){
        return null;
    }
  return (
    <div className='space-y-3'>
        <Header title='You May Like'/>
        <Carousel>
        <CarouselContent className='py-4 gap-3 px-2' >
            {
                data?.map((show) => (
                    <CarouselItem className='basis-1/2 md:basis-[15%]'>
                    <AnimeCard id={show.id} image={show.image} title={show.title} video={show.video} year={show.airing} />
                    </CarouselItem>
                ))
            }
      
        </CarouselContent>
        </Carousel>
    </div>
  )
}

export default Recommendation