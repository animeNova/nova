import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

interface CardSkeletonProps {
    count : number;
}
const CardSkeleton : React.FC<CardSkeletonProps> = ({count = 5}) => {
  return (
    <div className='flex-wrap flex justify-center items-center gap-4 md:gap-14 '>
      {
        Array.apply(null,Array(count)).map((_,_index) => (
            <Skeleton key={_index} className='w-[180px] h-[260px] md:w-[220px] md:h-[300px] rounded-md mx-6' />
        ))
      }
    </div>
  )
}

export default CardSkeleton
