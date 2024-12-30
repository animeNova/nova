"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button';
import { Loader2, Pause, Play } from 'lucide-react';
import Link from 'next/link';
import TrailerBtn from '../ui/trailer-btn';
interface HeroSlideProps {
  isActive : boolean,
  id:string;
  title:string;
  description:string;
  trailer :string;
  video:string
}

const HeroSlide : React.FC<HeroSlideProps> = ({isActive = false,description,id,title,trailer,video}) => {
    const [isPlaying, setIsPlaying] = useState(isActive)
    const [isLoading, setIsLoading] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)


  
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
    <video src={video} ref={videoRef} autoPlay={isPlaying} loop muted playsInline className="w-full h-[75vh] object-cover rounded-md" />
    </div>
    <div className='absolute top-0 left-0 h-full w-full text-center md:text-start' style={{'background' : `linear-gradient(rgba(0, 0, 0, 0.1), rgba(2,8,23,1)) center center/cover  `}}>
     <div className='mt-[125px] mx-[20px] md:mt-[250px] md:mx-[150px]'>
      <div className='flex flex-col gap-4'>
      {/* title */}
      <h1 className='text-6xl md:text-7xl font-bold text-white'>{title}</h1>
      {/* description */}
      <p className='max-w-md line-clamp-3 text-white/80'>{description}</p>
      {/* Buttons */}
      <div className='flex md:justify-start justify-center items-center gap-2'>
        <Link href={`/anime/${id}`}>
        <Button className='text-lg md:text-xl p-6'>Learn More</Button>

        </Link>
        <TrailerBtn link={trailer} isFixed={false} />
      </div>
      </div>
     </div>
    </div>
  </div>
  )
}

export default HeroSlide
