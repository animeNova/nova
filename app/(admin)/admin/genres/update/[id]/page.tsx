import { getGenre } from '@/app/(admin)/actions/genre/genre.action'
import React from 'react'
import { GenerForm } from '../../components/genre-form';
import { redirect } from 'next/navigation';

interface PageProps {
    params : {
        id : string
    }
}

const page =async (params : PageProps) => {
    const data = await getGenre(params.params.id);
    if(!data){
      redirect('/')
    }
  return (
    <>
      <GenerForm initialData={data} />
    </>
  )
}

export default page
