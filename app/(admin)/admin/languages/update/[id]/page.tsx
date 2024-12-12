import { getLanguage } from '@/app/(admin)/actions/languages/language.action'
import React from 'react'
import { LanguageForm } from '../../components/language-form';
import { redirect } from 'next/navigation';

interface PageProps {
    params : Promise<{
        id : string
    }>
}

const page =async (params : PageProps) => {
    const data = await getLanguage((await params.params).id);
    if(!data){
      redirect('/')
    }
  return (
    <>
      <LanguageForm initialData={data} />
    </>
  )
}

export default page
