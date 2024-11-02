import React from 'react'
import { columns } from './components/columns';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { DataTable } from '@/app/(admin)/components/table/data-table';
import Title from '@/app/(admin)/components/title/Title';
import { getCharacters } from '@/app/(admin)/actions/characters/characters.action';

interface PageProps {
  searchParams :{
    page?: string
  };
  params:{
    id : string;
  }
}

const page =async (props :PageProps) => {
    const page = parseInt(props.searchParams.page || "1"); 
    const {result,currentpage,hasNextPage,totalCharacter,totalPages} =await getCharacters({
        page : page ,
    } , props.params.id)     
    
  return (
    <div className='space-y-4'>
        <div className='flex justify-between  items-center'> 
            <Title title={`Chaacters (${totalCharacter})`} />
            <Link href={`/admin/shows/${props.params.id}/characters/add`}>
            <Button variant={'secondary'} >Add Charachter</Button>

            </Link>
      </div>
      <DataTable columns={columns} data={result} currentPage={currentpage} hasNextPage={hasNextPage} totalPages={totalPages} />
    </div>
  )
}

export default page
