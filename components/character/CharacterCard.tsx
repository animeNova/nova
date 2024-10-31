import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'


interface CharacterCardProps {
    name : string;
    role : string;
    casterIamge : string;
    image : string;
}

const CharacterCard = () => {
  return (
    <div 
    className='relative transition cursor-pointer rounded-lg hover:shadow-[0_0_30px_rgba(167,139,250,0.9)]'
    > 
    <div>
        <Image src={'https://m.media-amazon.com/images/I/81s+jxE5KEL._AC_SL1500_.jpg'} width={1000} height={1000}  alt='' className='w-[180px] h-[260px] md:w-[220px] md:h-[300px] rounded-[10px]object-contain ' />
    </div>
    <div className='absolute bottom-4 left-4 '>
      <h1 className={cn( 'text-lg font-normal transition text-white/75 hover:text-white')}>Chainsaw Man</h1>
      <p className={cn('text-sm text-white/70 ') }>
    <p  className='transition hover:text-white'>2021</p>  
    </p>
    </div>
    </div>
  )
}

export default CharacterCard
