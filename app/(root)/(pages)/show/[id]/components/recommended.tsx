"use client";
import AnimeCard from '@/components/cards/AnimeCard'
import CardSkeleton from '@/components/cardSkeleton/CardSkeleton';
import { useGetRecommend } from '@/hooks/useGetRecommend'
import { useParams } from 'next/navigation'
import React from 'react'

const Recommended =() => {
    const params = useParams<{id:string}>()
    const {data,isLoading} = useGetRecommend(params.id)

  return (
    <div className='flex justify-start items-center gap-2 flex-wrap'>
      {
        isLoading && (
          <CardSkeleton count={5} />
        )
      }
      {
        data?.map((show) => (
            <AnimeCard key={show.id} id={show.id} image={show.image} title={show.title} video={show.video}  year={show.airing} />
        ))
      }
    </div>
  )
}

export default Recommended
