import React from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Watched = () => {
  return (
    <div>
        <Button variant={'secondary'} className='p-4 md:text-lg'>
                        <Check size={25}/>
                        Watched
         </Button>
    </div>
  )
}

export default Watched
