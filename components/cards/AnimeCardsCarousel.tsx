"use client";
import React from 'react'
import AnimeCard from './AnimeCard';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Header from '../ui/header';
const AnimeCardsCarousel = () => {
  return (
    <div className='space-y-3'>
        <Header title='Trending'  />
 
    <Carousel >
        <CarouselContent className='py-4'>

                <CarouselItem className='basis-1/2 md:basis-[15%]'>
                <AnimeCard />
            </CarouselItem>
                <CarouselItem className='basis-1/2  md:basis-[15%]'>
                <AnimeCard />
            </CarouselItem>
                <CarouselItem className='basis-1/2 md:basis-[15%]'>
                <AnimeCard />
            </CarouselItem>
                <CarouselItem className='basis-1/2 md:basis-[15%]'>
                <AnimeCard />
            </CarouselItem>
                <CarouselItem className='basis-1/2  md:basis-[15%]'>
                <AnimeCard />
            </CarouselItem>
                <CarouselItem className='basis-1/2  md:basis-[15%]'>
                <AnimeCard />
            </CarouselItem>
            <CarouselItem className='basis-1/2 md:basis-[15%]'>
                <AnimeCard />
            </CarouselItem>
            <CarouselItem className='basis-1/2 md:basis-[15%]'>
                <AnimeCard />
            </CarouselItem>

    
        </CarouselContent>
    </Carousel>
    </div>
  )
}

export default AnimeCardsCarousel