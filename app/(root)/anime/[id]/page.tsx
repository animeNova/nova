import AnimePage from '@/components/anime/animePage';
import React from 'react'
interface PageProps {
    params : {
        id : string;
    }
}

const page : React.FC<PageProps> = ({params}) => {
    
  return (
    <>
    <AnimePage />
    </>
  )
}

export default page
