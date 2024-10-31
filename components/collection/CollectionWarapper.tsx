import React from 'react'
import Header from '../ui/heade'

const CollectionWarapper = ({
    children
}:{children:React.ReactNode}) => {
  return (
    <div className='space-y-2'>

    <Header title='Featured Collections' />
    <div className='flex justify-center items-center gap-4 flex-wrap'>
      {children}
    </div>
    </div>
  )
}

export default CollectionWarapper
