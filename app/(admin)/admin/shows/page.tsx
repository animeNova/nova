import React from 'react'
import { getshows } from '../../actions/show/show.server'
import {DataTable} from '../../components/table/data-table'
import { columns } from './components/columns';
import Header from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import Title from '../../components/title/Title';
import Link from 'next/link';
const page =async (props: { searchParams: Promise<{ page?: string}> }) => {
  const searchParams = await props.searchParams;

  const page = parseInt(searchParams.page || "1");
  const {result,currentpage,hasNextPage,totalShows,totalPages} =await getshows({
      page : page
  })
  return (
    <div className='space-y-4'>
        <div className='flex justify-between  items-center'> 
            <Title title={`Shows (${totalShows})`} />
            <Link href={'/admin/shows/add'}>
            <Button variant={'secondary'} >Add Show</Button>
            </Link>
      </div>
      <DataTable columns={columns} data={result} currentPage={currentpage} hasNextPage={hasNextPage} totalPages={totalPages} />
    </div>
  )
}

export default page
