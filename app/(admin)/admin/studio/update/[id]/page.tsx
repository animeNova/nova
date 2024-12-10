import { getStaff } from '@/app/(admin)/actions/staff/staff.action'
import React from 'react'
import { StudioForm } from '../../components/studio-form';

interface PageProps {
    params : {
        id : string
    }
}

const page =async (params : PageProps) => {
    const data = await getStaff(params.params.id);
    
  return (
    <>
      <StudioForm initialData={data} />
    </>
  )
}

export default page
