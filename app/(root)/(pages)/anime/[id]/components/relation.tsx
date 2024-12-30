"use client";
import AnimeCard from '@/components/cards/AnimeCard'
import CardSkeleton from '@/components/cardSkeleton/CardSkeleton';
import { useGetRelations } from '@/hooks/useGetRealations'
import { useParams } from 'next/navigation'
import React from 'react'

const Relations =() => {
    const params = useParams<{id:string}>()
    const {data,isLoading} = useGetRelations(params.id)

    if(!data?.length){
        return <p className='px-4 text-foreground/80'>No Relations Found!</p>
    }

    
  return (
    <div className='flex justify-start items-center gap-2 flex-wrap'>
      {
        isLoading && (
          <CardSkeleton count={7} />
        )
      }
      {
        data?.map((show) => (
            <AnimeCard id={show.id} image={show.image} title={show.title} video={show.video} year={show.airing} />
        ))
      }
    </div>
  )
}

export default Relations
