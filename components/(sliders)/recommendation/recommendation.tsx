"use client";
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import Header from '@/components/ui/header';
import { useSession } from '@/app/lib/auth/client';
import { useGetRecommendation } from '@/hooks/useGetRecommendation';
import AnimeCard from '@/components/cards/AnimeCard';
import CardSkeleton from '@/components/cardSkeleton/CardSkeleton';
import { notFound } from 'next/navigation';

const Recommendation = () => {
    const {data : user} = useSession()
    const {data ,isLoading} = useGetRecommendation()
    if(isLoading){
      return <CardSkeleton isSlide={true} count={10}  />
    }
    if(!data){
        return null;
    }   
  return (
    <div className='space-y-3'>
        <Header title='You May Like'/>
        <Carousel>
        <CarouselContent className='py-4 px-4' >
            {
                data?.map((show) => (
                    <CarouselItem className='basis-1/2 md:basis-[19%] ' key={show.id}>
                    <AnimeCard id={show.id} image={show.image!} title={show.title} video={show.video!} year={show.airing.toLocaleString()} key={show.id} type={show.type}  />
                    </CarouselItem>
                ))
            }
      
        </CarouselContent>
        </Carousel>
    </div>
  )
}

export default Recommendation