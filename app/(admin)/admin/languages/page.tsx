import React from 'react'
import { getLanguages } from '../../actions/languages/language.action'
import {DataTable} from '../../components/table/data-table'
import { columns } from './components/columns';
import Header from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import Title from '../../components/title/Title';
import Link from 'next/link';
const page =async (props: { searchParams: Promise<{ page?: string}> }) => {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1");
  const {result,currentpage,hasNextPage,totalGenres,totalPages} =await getLanguages({
      page : page
  })
  return (
    <div className='space-y-4'>
        <div className='flex justify-between  items-center'> 
            <Title title={`Languages (${totalGenres})`} />
            <Link href={'/admin/languages/add'}>
            <Button variant={'secondary'} >Add Language</Button>

            </Link>
      </div>
      <DataTable columns={columns} data={result} currentPage={currentpage} hasNextPage={hasNextPage} totalPages={totalPages} />
    </div>
  )
}

export default page
