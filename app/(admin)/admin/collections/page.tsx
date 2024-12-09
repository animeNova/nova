import React from 'react'
import { getGenres } from '../../actions/genre/genre.action'
import {DataTable} from '../../components/table/data-table'
import { columns } from './components/columns';
import Header from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import Title from '../../components/title/Title';
import Link from 'next/link';
const page =async ({ searchParams }: { searchParams: { page?: string} }) => {
    const page = parseInt(searchParams.page || "1"); 
    const {result,currentpage,hasNextPage,totalGenres,totalPages} =await getGenres({
        page : page
    })     
  return (
    <div className='space-y-4'>
        <div className='flex justify-between  items-center'> 
            <Title title={`Genres (${totalGenres})`} />
            <Link href={'/admin/genres/add'}>
            <Button variant={'secondary'} >Add Genre</Button>

            </Link>
      </div>
      <DataTable columns={columns} data={result} currentPage={currentpage} hasNextPage={hasNextPage} totalPages={totalPages} />
    </div>
  )
}

export default page
