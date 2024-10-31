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
const SLIDE_COUNT = 2
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
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
  return (
    //  <div className="embla" ref={emblaRef}>
    //   <div className="embla__viewport" ref={emblaRef}>
    //     <div className="embla__container">
    //        <div className="embla__slide" >
    //             <div className="embla__slide__number">
    //                 <HeroSlide/>
    //             </div>
    //         </div>
    //        <div className="embla__slide" >
    //             <div className="embla__slide__number">
    //                 <HeroSlide/>
    //             </div>
    //         </div>
    //     </div>
    //   </div>
    //  </div>
    (<section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
            {SLIDES.map((d ,index) => (
                  <div className="embla__slide" key={index}>
                   <div className="embla__slide__number" key={index} >
                     <HeroSlide  isActive={index === currentIndex}/>
                   </div>
                 </div>
            ))}


        </div>
      </div>
    </section>)
  );
}

export default Hero
