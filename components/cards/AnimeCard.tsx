"use client";

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import {AnimatePresence } from "framer-motion"
import {MotionImage,MotionVideo} from '@/lib/utils'
interface AnimeCardProps {
  id : string;
  title : string;
  image : string;
  video :string;
  year : string;  
}


const AnimeCard : React.FC<AnimeCardProps> = ({id,image,title,video,year}) => {
  const [mounted,SetMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() =>{
    SetMounted(true)
  },[])
  if(!mounted){
    return null;
  }
  return (
 
    <div 
  
    className='w-[160px] h-[240px] md:w-[220px] md:h-[300px] rounded-[10px] relative  cursor-pointer hover:shadow-[0_0_30px_rgba(167,139,250,0.9)]'
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    > 
    <AnimatePresence  initial={false} mode="wait">
         {!isHovered && (
           <MotionImage
           key="image"
           src={image}
           alt='boobs'
           className="w-full h-full object-cover absolute inset-0 rounded-md"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.3, ease: "easeInOut" }}
         />
        )}
    {isHovered && (
            <MotionVideo
            key="video"
            src={video}
            loop
            muted
            playsInline
            autoPlay
            className="w-full h-full object-cover absolute inset-0 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        )}
 
    </AnimatePresence>
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

    <div className='absolute bottom-4 left-4 '>
      <Link href={`/anime/${id}`}>
      <h1 className={cn( 'text-lg font-normal transition text-white/75  hover:text-white')}>{title}</h1>
      </Link>
      
      <p className={cn('text-sm text-white/70  ') }>
    <Link href={`/year/${year?.slice(0,4)}`} className='transition hover:text-white'>
    {
      year?.slice(0,4)
    }
    </Link>
         
    </p>
    </div>
    </div>
   
  )
}

export default AnimeCard
