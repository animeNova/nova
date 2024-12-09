'use client'

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import HeroSlide from './HeroSlide'
import { Button } from '../ui/button'
import { useGetPinned } from '@/hooks/useGetPinned'
import HeroLoading from './loading'
const SLIDE_COUNT = 2
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
const Hero = () => {
  const {data,isLoading} =useGetPinned()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentIndex, setCurrentIndex] = useState(0)
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])
  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])
  useEffect(() => {
    console.log(currentIndex);
    
  },[currentIndex])

  if(isLoading){
    return <HeroLoading />
  }
  return (

    (<section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
            {data?.map((show ,index) => (
                  <div className="embla__slide" key={index}>
                   <div className="embla__slide__number" key={index} >
                     <HeroSlide  id={show.show?.id!} title={show.show?.title!} description={show.show?.description!} trailer={show.show?.trailer!} video={show.show?.video!} isActive={index === currentIndex}/>
                   </div>
                 </div>
            ))}


        </div>
      </div>
    </section>)
  );
}

export default Hero
