import AnimePage from '@/components/anime/animePage';
import React from 'react'
import { getRecommendation, getShow } from '../../../actions/shows/show';
interface PageProps {
    params : {
        id : string;
    }
}

const page : React.FC<PageProps> =async ({params}) => {
    const data = await getShow(params.id)    
    
  return (
    <>
    <AnimePage data={data}  />
    </>
  )
}

export default page