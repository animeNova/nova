import { Button } from '@/components/ui/button'
import { Bookmark } from 'lucide-react'
import React from 'react'

const ToWatch = () => {
  return (
    <div>
               <Button variant={'secondary'} className='p-4 md:text-lg'>
                        <Bookmark size={25}/>
                        To Watch
                        </Button>
           
    </div>
  )
}

export default ToWatch
