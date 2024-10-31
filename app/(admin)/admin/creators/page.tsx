import React from 'react'
import { getCreators } from '../../actions/creator/creator.action'
import {DataTable} from '../../components/table/data-table'
import { columns } from './components/columns';
import Header from '@/components/ui/heade';
import { Button } from '@/components/ui/button';
import Title from '../../components/title/Title';
import Link from 'next/link';
const page =async ({ searchParams }: { searchParams: { page?: string} }) => {
    const page = parseInt(searchParams.page || "1"); 
    const {result,currentpage,hasNextPage,totalcreator,totalPages} =await getCreators({
        page : page
    })     
  return (
    <div className='space-y-4'>
        <div className='flex justify-between  items-center'> 
            <Title title={`Creators (${totalcreator})`} />
            <Link href={'/admin/creators/add'}>
            <Button variant={'secondary'} >Add Creator</Button>

            </Link>
      </div>
      <DataTable columns={columns} data={result} currentPage={currentpage} hasNextPage={hasNextPage} totalPages={totalPages} />
    </div>
  )
}

export default page
