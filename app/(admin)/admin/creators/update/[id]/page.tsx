import { getCreator } from '@/app/(admin)/actions/creator/creator.action'
import React from 'react'
import { CreatorForm } from '../../components/creator-form';

interface PageProps {
    params : Promise<{
        id : string
    }>
}

const page =async (params : PageProps) => {
    const data = await getCreator((await params.params).id);
    
  return (
    <>
      <CreatorForm initialData={data} />
    </>
  )
}

export default page
