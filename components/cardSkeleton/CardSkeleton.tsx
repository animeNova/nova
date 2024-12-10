import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
interface CardSkeletonProps {
    count : number;
    isSlide ?: boolean;
}
const CardSkeleton : React.FC<CardSkeletonProps> = ({count = 5,isSlide = false}) => {
  return (
    <>
    {
      !isSlide ? (
        <div className='flex-wrap flex justify-center items-center gap-4 md:gap-14 '>
        {
          Array.apply(null,Array(count)).map((_,_index) => (
              <Skeleton key={_index} className='w-[180px] h-[260px] md:w-[220px] md:h-[300px] rounded-md mx-6' />
          ))
        }
      </div>
      ) : (
        <>
             <Carousel>
        <CarouselContent className='py-4 px-4'>
              {
                Array.apply(null,Array(count)).map((_,_index) => (
                  <CarouselItem className='basis-1/2 md:basis-[19%]'>
                        <Skeleton key={_index} className='w-[180px] h-[260px] md:w-[220px] md:h-[300px] rounded-md mx-6' />

                  </CarouselItem>
                ))
              }
        </CarouselContent>
      </Carousel>
        </>
      )
    }

    </>
  )
}

export default CardSkeleton
