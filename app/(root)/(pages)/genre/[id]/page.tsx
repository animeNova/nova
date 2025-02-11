import AnimeCard from '@/components/cards/AnimeCard'
import OrderbyFilter from '@/components/ui/orderbyFilter'
import { db } from '@/drizzle'
import { genre, show, showToGenre } from '@/drizzle/db/schema'
import { and, eq } from 'drizzle-orm'
import React from 'react'

interface PageParams {
    params :{
        id : string
    }
}

const page : React.FC<PageParams> =async ({params}) => {
    const {id} = await params
    const result = await db.select({
        id : show.id,
        title : show.title,
        image : show.image,
        airing : show.airing,
        video : show.video
    }).from(show).innerJoin(showToGenre,and(eq(showToGenre.showId,show.id),eq(showToGenre.genreId,id)))
    const genreData = await db.select({
        title :genre.title
    }).from(genre).where(eq(genre.id,id))
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-semibold uppercase'>
            {
                genreData[0].title
            }
        </h1>
        <div className='flex justify-center items-center gap-2'>
        </div>
   
     </div>
      <div className='flex-wrap flex justify-center items-center gap-4 md:gap-14'>
      {
        result.map((show) => (
          <AnimeCard id={show.id} image={show.image} video={show.video} title={show.title} year={show.airing} key={show.id}  />
        ))
      }
    </div>
    </div>
  )
}

export default page
