import { getStaff } from '@/app/(admin)/actions/staff/staff.action'
import React from 'react'
import { StaffForm } from '../../components/staff-form';

interface PageProps {
    params : Promise<{
        id : string
    }>
}

const page =async (params : PageProps) => {
    const data = await getStaff((await params.params).id);
    
  return (
    <>
      <StaffForm initialData={data} />
    </>
  )
}

export default page
