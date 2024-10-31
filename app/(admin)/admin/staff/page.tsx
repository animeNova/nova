import React from 'react'
import { getStaffs } from '../../actions/staff/staff.action'
import {DataTable} from '../../components/table/data-table'
import { columns } from './components/columns';
import { Button } from '@/components/ui/button';
import Title from '../../components/title/Title';
import Link from 'next/link';
const page =async ({ searchParams }: { searchParams: { page?: string} }) => {
    const page = parseInt(searchParams.page || "1"); 
    const {result,currentpage,hasNextPage,totalCast,totalPages} =await getStaffs({
        page : page
    })     
    
  return (
    <div className='space-y-4'>
        <div className='flex justify-between  items-center'> 
            <Title title={`Staff (${totalCast})`} />
            <Link href={'/admin/staff/add'}>
            <Button variant={'secondary'} >Add Staff</Button>

            </Link>
      </div>
      <DataTable columns={columns} data={result} currentPage={currentpage} hasNextPage={hasNextPage} totalPages={totalPages} />
    </div>
  )
}

export default page
