"use client";
import React from 'react'
import { Button } from './button';
import {deleteVideo} from '@/app/(admin)/actions/video/video.action'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface VideoPreviewProps {
    url : string;
    id:string;
}

const VideoPreview : React.FC<VideoPreviewProps> = ({url,id}) => {
  const router = useRouter()
  const removeVideo = async () => {
   const res = await deleteVideo(id)
   if(!res.success){
    toast.error("Something went wrong!")
   }
   toast.success(res.message)
   router.refresh()
  }
  return (
    <div className='text-center space-y-2'>
      <video src={url} controls={true} autoPlay={false} className='h-[720px] w-full object-cover aspect-auto' />
      <Button variant={'destructive'} onClick={removeVideo}>Delete video</Button>
    </div>
  )
}

export default VideoPreview