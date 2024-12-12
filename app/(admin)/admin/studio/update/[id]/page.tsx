import { getStaff } from '@/app/(admin)/actions/staff/staff.action'
import React from 'react'
import { StudioForm } from '../../components/studio-form';

interface PageProps {
    params : Promise<{
        id : string
    }>
}

const page =async (params : PageProps) => {
    const data = await getStaff((await params.params).id);
    
  return (
    <>
      <StudioForm initialData={data} />
    </>
  )
}

export default page
