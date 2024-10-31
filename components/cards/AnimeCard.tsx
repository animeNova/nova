"use client";

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const AnimeCard = () => {
  const [mounted,SetMounted] = useState(false);

  useEffect(() =>{
    SetMounted(true)
  },[])
  if(!mounted){
    return null;
  }
  return (
 
    <div  style={{'background' : `linear-gradient(to bottom, rgba(0,0,0,0) , rgba(2,8,23,0.3)),url(${`https://m.media-amazon.com/images/I/81s+jxE5KEL._AC_SL1500_.jpg`}) center  center/cover  `}}
    className='w-[180px] h-[260px] md:w-[220px] md:h-[300px] rounded-[10px] relative transition cursor-pointer hover:shadow-[0_0_30px_rgba(167,139,250,0.9)]'
    > 
    <div className='absolute bottom-4 left-4 '>
      <h1 className={cn( 'text-lg font-normal transition text-white/75 hover:text-white')}>Chainsaw Man</h1>
      <p className={cn('text-sm text-white/70 ') }>
    <Link href={'/year'} className='transition hover:text-white'>2021</Link>
    ,
    <Link href={'/tag'} className='transition hover:text-white'>action</Link>
     
    </p>
    </div>
    <div className='absolute top-3 right-3'>
        <div className='flex justify-center items-center gap-2'>
            <div className={cn('w-8 h-8 rounded-[50%] flex justify-center text-sm items-center font-light bg-primary text-white shadow-md')}>
              8.5
            </div>
        </div>
    </div>
    </div>
   
  )
}

export default AnimeCard
