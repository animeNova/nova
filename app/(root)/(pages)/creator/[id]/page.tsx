import AnimeCard from '@/components/cards/AnimeCard'
import { db } from '@/drizzle'
import { creator, show } from '@/drizzle/db/schema'
import { eq } from 'drizzle-orm'
import Image from 'next/image'
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
        video : show.video,
        type : show.type
    }).from(show).where(eq(show.creatorId,id))
    const creatorData = await db.select({
        id : creator.id ,
        name : creator.name ,
        image : creator.image
    }).from(creator).where(eq(creator.id,id))
  return (
    <div className='space-y-2'>
      <div className='flex justify-start items-center gap-2'>
        <Image src={creatorData[0].image || '/assets/unknown.jpg'} width={100} height={100} className='w-12 h-12 rounded-md' alt={creatorData[0].name} />
        <h1 className='text-3xl font-semibold uppercase'>
            {
                creatorData[0].name
            }({result.length})
        </h1>
        <div className='flex justify-center items-center gap-2'>
        </div>
   
     </div>
      <div className='flex-wrap flex justify-center items-center gap-4 md:gap-14'>
      {
        result.map((show) => (
          <AnimeCard id={show.id} image={show.image} video={show.video} title={show.title} year={show.airing} key={show.id} type={show.type}  />
        ))
      }
    </div>
    </div>
  )
}

export default page
