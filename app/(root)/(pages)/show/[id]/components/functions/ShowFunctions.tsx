import React from 'react'
import Collections from './Collections/Collections'
import Watching from './watching/Watching'
import ToWatch from './toWatch/ToWatch'
import Watched from './Watched/Watched'



const ShowFunctions = () => {
  return (
     <div className='flex justify-center md:justify-between items-center w-full flex-wrap gap-4'>
                <div className='flex justify-start items-center gap-4 mx-3'>
                <Watching />
                <ToWatch />
                <Watched />
                </div>
                <div>
                <Collections/>
                </div>
    </div>
     

  )
}



export default ShowFunctions
