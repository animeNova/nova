import Image from 'next/image'
import React from 'react'

const CollectionCard = () => {
  return (
    <div className='bg-[#000] dark:bg-[#242424b7] rounded-md overflow-y-hidden hover:shadow-[0_0_30px_rgba(167,139,250,0.7)] transition cursor-pointer'>
        <div className='flex justify-between items-center flex-col gap-4 md:h-[300px] md:w-[550px] pt-5'>
            {/* title */}
            <div>
            <h1 className='text-2xl font-semibold text-white/70'>The Best Mystical Anime</h1>
            </div>
            {/* Anime Cards */}
            <div className='flex justify-center overflow-x-hidden overflow-y-hidden w-full'>
                <Image src={"https://m.media-amazon.com/images/I/81s+jxE5KEL._AC_SL1500_.jpg"} width={1000} height={1000} alt='' className='rounded-md h-[250px] w-[150px] object-cover mt-7 mr-[-20px] rotate-6 ' />
                <Image src={"https://m.media-amazon.com/images/I/81s+jxE5KEL._AC_SL1500_.jpg"} width={1000} height={1000} alt='' className='rounded-md h-[250px] w-[200px] object-cover mt-[10px]  z-10 rotate-6 
                
                ' />
                <Image src={"https://m.media-amazon.com/images/I/81s+jxE5KEL._AC_SL1500_.jpg"} width={1000} height={1000} alt='' className='rounded-md h-[250px] w-[150px] object-cover mt-7 ml-[-20px] rotate-6 ' />
            </div>
        </div>
    </div>
  )
}

export default CollectionCard
