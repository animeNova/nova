import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const Collections = () => {
  return (
    <div>
            <Button variant={'secondary'} className='p-4 text-lg'>
                        <Plus />
                        Add to Collection
            </Button>
    </div>
  )
}

export default Collections
