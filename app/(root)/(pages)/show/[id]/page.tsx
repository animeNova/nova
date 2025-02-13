import ShowPage from '@/components/show/showPage';
import React from 'react'
import { getShow } from '../../../actions/shows/show';
interface PageProps {
    params : {
        id : string;
    }
}

const page : React.FC<PageProps> =async props => {
    const params =await props.params;
    const data = await getShow(params.id)

    return (
      <>
      <ShowPage data={data}  />
      </>
    )
}

export default page
