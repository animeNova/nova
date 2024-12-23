'use client';
import { Button } from '@/components/ui/button'
import { Eye, Loader2} from 'lucide-react'
import { useParams } from 'next/navigation';
import React from 'react'
import { useGetWatching } from './hooks/useGetWatching';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddWatching } from './actions/watching.action';
import { cn } from '../../../../../../../../lib/utils';
import { useSession } from '@/app/lib/auth/client';
import toast from 'react-hot-toast';


const Watching = () => {
    const params = useParams<{id:string}>()
    const {data,isLoading,refetch} = useGetWatching(params.id)
    const user = useSession()
    const {mutate} = useMutation({ mutationFn:  async () => await AddWatching(params.id) })
    const queryClient = useQueryClient()
    const onClick =async () => {
        // if(!user.data?.session){
        //     return toast.error("You Need To Login!")
        // }
        mutate()
        refetch()
    }
    if(isLoading){
        return <Loader2 />
    }
  return (
    <div>
        {
            data?.length ? (
                <Button variant={'secondary'}  className={cn('p-4 md:text-lg bg-primary text-white')}  onClick={onClick}>
                <Eye size={30} />
                Watching
            </Button>
            ) : (
                <Button variant={'secondary'} className='p-4 md:text-lg' onClick={onClick}>
                    <Eye size={30} />
                    Watching
                </Button>
            )
        }
     
    </div>
  )
}

export default Watching
