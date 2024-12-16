import AnimePage from '@/components/anime/animePage';
import React from 'react'
import { getShow } from '../../../actions/shows/show';
interface PageProps {
    params : {
        id : string;
    }
}

const page : React.FC<PageProps> =async props => {
    const params = props.params;
    const data = await getShow(params.id)

    return (
      <>
      <AnimePage data={data}  />
      </>
    )
}

export default page
