"use client";
import Header from '@/components/ui/header'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import { useGetBestYear } from '@/hooks/useGetBestYear';
import AnimeCard from '@/components/cards/AnimeCard';
import CardSkeleton from '@/components/cardSkeleton/CardSkeleton';
const Best = () => {
    const {data,isLoading} = useGetBestYear()
    if(isLoading){
        return <CardSkeleton isSlide={true} count={10}  />
    }
  return (
    <>
          <div className='space-y-3'>
        <Header title='Most Recent'/>
        <Carousel>
        <CarouselContent className='py-4 px-4' >
            {
                data?.map((show) => (
                    <CarouselItem className='basis-1/2 md:basis-[19%]' key={show.id}>
                    <AnimeCard id={show.id} image={show.image} title={show.title} video={show.video} year={show.airing}  key={show.id} type={show.type} />
                    </CarouselItem>
                ))
            }
      
        </CarouselContent>
        </Carousel>
    </div>
    </>
  )
}

export default Best
