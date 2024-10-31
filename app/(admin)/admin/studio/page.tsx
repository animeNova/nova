import React from 'react'
import { getStudios } from '../../actions/studio/studio.action'
import {DataTable} from '../../components/table/data-table'
import { columns } from './components/columns';
import { Button } from '@/components/ui/button';
import Title from '../../components/title/Title';
import Link from 'next/link';
const page =async ({ searchParams }: { searchParams: { page?: string} }) => {
    const page = parseInt(searchParams.page || "1"); 
    const {result,currentpage,hasNextPage,totalstudio,totalPages} =await getStudios({
        page : page
    })     
    
  return (
    <div className='space-y-4'>
        <div className='flex justify-between  items-center'> 
            <Title title={`Studios (${totalstudio})`} />
            <Link href={'/admin/studio/add'}>
            <Button variant={'secondary'} >Add Studio</Button>

            </Link>
      </div>
      <DataTable columns={columns} data={result} currentPage={currentpage} hasNextPage={hasNextPage} totalPages={totalPages} />
    </div>
  )
}

export default page
