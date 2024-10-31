"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button';
import { Loader2, Pause, Play } from 'lucide-react';
interface HeroSlideProps {
  isActive : boolean
}

const HeroSlide : React.FC<HeroSlideProps> = ({isActive = false}) => {
    const [isPlaying, setIsPlaying] = useState(isActive)
    const [isLoading, setIsLoading] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause()
        } else {
          videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
      }
    }
  
    useEffect(() => {
      const videoElement = videoRef.current
      if (videoElement) {
        const handleLoadedData = () => setIsLoading(false)
        const handleWaiting = () => setIsLoading(true)
        const handleCanPlay = () => setIsLoading(false)
  
        videoElement.addEventListener('loadeddata', handleLoadedData)
        videoElement.addEventListener('waiting', handleWaiting)
        videoElement.addEventListener('canplay', handleCanPlay)
  
        return () => {
          videoElement.removeEventListener('loadeddata', handleLoadedData)
          videoElement.removeEventListener('waiting', handleWaiting)
          videoElement.removeEventListener('canplay', handleCanPlay)
        }
      }
    }, [])
    useEffect(() => {
          if (isActive && videoRef.current) {
            videoRef.current.play()
          } else {
            videoRef?.current?.pause()
          }

    }, [isActive])
  
  
  return (
    <div className="w-full relative" >
    <div className="aspect-video h-[75vh] w-full" >
    <video src={"/assets/anime.webm"} ref={videoRef} autoPlay={isPlaying} loop muted playsInline className="w-full h-[75vh] object-cover" />
    </div>
    <div className='absolute top-0 left-0 h-full w-full text-center md:text-start' style={{'background' : `linear-gradient(rgba(0, 0, 0, 0.1), rgba(2,8,23,1)) center center/cover  `}}>
     <div className='mt-[125px] mx-[20px] md:mt-[250px] md:mx-[150px]'>
      <div className='flex flex-col gap-4'>
      {/* title */}
      <h1 className='text-6xl md:text-7xl font-bold text-white'>Chainsaw Man</h1>
      {/* description */}
      <p className='max-w-md line-clamp-3 text-white/80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore beatae excepturi itaque accusamus! Voluptas rerum necessitatibus, maiores optio vero exercitationem rem, minus illo ex tenetur, numquam a consequatur nemo! Sint, voluptatum. Impedit laboriosam sunt enim harum! Itaque quam vitae quae atque beatae neque placeat, deleniti sapiente ab earum excepturi alias.</p>
      {/* Buttons */}
      <div className='flex md:justify-start justify-center items-center gap-2'>
      <Button className='text-lg md:text-xl p-6'>Learn More</Button>
      <Button className='text-lg md:text-xl p-6' variant={"secondary"}>Watch Trailer</Button>
      </div>
      </div>
     </div>
    </div>
  </div>
  )
}

export default HeroSlide
