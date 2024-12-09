"use client";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useState } from 'react'
import {MotionImage} from '@/lib/utils'
import { AnimatePresence } from 'framer-motion';


interface CharacterCardProps {
    id:string;
    name : string;
    image : string | null;
    castImage:string | null;
}

const CharacterCard : React.FC<CharacterCardProps> = ({id,image,name,castImage}) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div 
    className='relative transition cursor-pointer rounded-lg hover:shadow-[0_0_30px_rgba(167,139,250,0.9)]'
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    > 
   <AnimatePresence  initial={false} mode="wait">
      {
        isHovered ? (
          <MotionImage src={castImage!} width={1000} height={1000}  alt='' className='w-[180px] h-[260px] md:w-[220px] md:h-[300px]  object-fill rounded-md'
          key={'cast'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          />

        ): (
          <MotionImage src={image!} width={1000} height={1000}  alt='' className='w-[180px] h-[260px] md:w-[220px] md:h-[300px]  object-fill rounded-md'
          key={'character'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          />

        )
      }
  </AnimatePresence>
    
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

    <div className='absolute bottom-4 left-4 '>
      <Link href={`/chracter/${id}`}>
      <h1 className={cn( 'text-lg font-normal transition text-white/75 hover:text-white')}>{name}</h1>

      </Link>
    </div>
    </div>
  )
}

export default CharacterCard
