import { getGenre } from '@/app/(admin)/actions/genre/genre.action'
import React from 'react'
import { GenerForm } from '../../components/genre-form';
import { redirect } from 'next/navigation';

interface PageProps {
    params : Promise<{
        id : string
    }>
}

const page =async (params : PageProps) => {
    const data = await getGenre((await params.params).id);
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
