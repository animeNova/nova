import { getGenre } from '@/app/(admin)/actions/genre/genre.action'
import React from 'react'
import { GenerForm } from '../../components/genre-form';

interface PageProps {
    params : Promise<{
        id : string
    }>
}

const page =async (params : PageProps) => {
    const data = await getGenre((await params.params).id);
    
  return (
    <>
      <GenerForm initialData={data} />
    </>
  )
}

export default page
