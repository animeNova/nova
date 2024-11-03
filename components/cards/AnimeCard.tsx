"use client";

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"

const AnimeCard = () => {
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
    className='w-[180px] h-[260px] md:w-[220px] md:h-[300px] rounded-[10px] relative  cursor-pointer hover:shadow-[0_0_30px_rgba(167,139,250,0.9)]'
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    > 
    <AnimatePresence  initial={false} mode="wait">
         {!isHovered && (
           <motion.img
           key="image"
           src={'https://m.media-amazon.com/images/I/81s+jxE5KEL._AC_SL1500_.jpg'}
           alt={'boobs'}
           className="w-full h-full object-cover absolute inset-0"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.3, ease: "easeInOut" }}
         />
        )}
    {isHovered && (
            <motion.video
            key="video"
            src={'/assets/anime.webm'}
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
    <div className='absolute bottom-4 left-4 '>
      <h1 className={cn( 'text-lg font-normal transition text-white/75 hover:text-white')}>Chainsaw Man</h1>
      <p className={cn('text-sm text-white/70 ') }>
    <Link href={'/year'} className='transition hover:text-white'>2021</Link>
         
    </p>
    </div>
    </div>
   
  )
}

export default AnimeCard
