import React from 'react'
import Header from '../../ui/header'
import AnimeCard from '../../cards/AnimeCard'
import { Button } from '../../ui/button'
import { useGetPopular } from '@/hooks/useGetPopular'
import CardSkeleton from '@/components/cardSkeleton/CardSkeleton'
import { useRouter } from 'next/navigation'

const Popular = () => {
  const {data,isLoading,isFetching} = useGetPopular()
  const router = useRouter()
  if(isLoading || isFetching){
    return <CardSkeleton isSlide={true} count={10}  />
  }
  return (
    <div className='flex flex-col gap-5'>
      <Header title='Most Popular' />
      <div className='flex justify-center items-center gap-4 md:gap-12 flex-wrap w-full'>
      {data?.map((anime) => (
        <AnimeCard key={anime.id} id={anime.id} image={anime.image} title={anime.title} video={anime.video} year={anime.airing} />
      ))}
      </div>
      <Button onClick={() => router.push('/catalog')} className='w-full bg-black dark:bg-white/85 text-secondary p-2 text-xl font-bold hover:bg-white/80 font-archivo ' >Show More</Button>
    </div>
  )
}

export default Popular
