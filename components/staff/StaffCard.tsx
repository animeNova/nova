import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'


interface StaffCardProps {
    id:string;
    name : string;
    job : string;
    image:string;
}

const StaffCard : React.FC<StaffCardProps> = ({id,job,name,image}) => {
  return (
    <div 
    className='relative transition cursor-pointer rounded-lg hover:shadow-[0_0_30px_rgba(167,139,250,0.9)]'
    > 
    <div>
        <Image src={image || '/assets/unknown.jpg'} width={1000} height={1000}  alt='' className='w-[180px] h-[260px] md:w-[220px] md:h-[300px] rounded-md object-cover ' />
    </div>
    <div className='absolute bottom-4 left-4 '>
      <h1 className={cn( 'text-lg font-normal transition text-white/75 hover:text-white')}>{name}</h1>
  
    <p  className='transition hover:text-white'>{job}</p>  
    
    </div>
    </div>
  )
}

export default StaffCard
