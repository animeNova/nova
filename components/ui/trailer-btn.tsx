import React from 'react'
import { Button } from './button';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrailerBtnProps {
    link :string;
    isFixed ?: boolean;
}

const TrailerBtn : React.FC<TrailerBtnProps> = ({link,isFixed=false}) => {
    const handleRedirect = () => {
        const youtubeUrl = link
        window.open(youtubeUrl, '_blank', 'noopener,noreferrer')
      }
    if(!link){
        return null;
    }
  return (
    <div className={cn('',isFixed && 'absolute bottom-4 right-4  ')}>
    <Button variant={'secondary'} className={cn('text-lg' , !isFixed && 'p-6')}
    onClick={handleRedirect}
    ><Play/> Watch Trailer</Button>
    </div>
  )
}

export default TrailerBtn
