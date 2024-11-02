import React from 'react'
import { CharacterForm } from '../components/character-form'
import { getshow } from '@/app/(admin)/actions/show/show.server'
import { redirect } from 'next/navigation';

const page = async ({params : {id}} : {params : {id : string}}) => {
  const show = await getshow(id);
  if(!show){
    redirect('/admin/shows')
  }
  return (
    <CharacterForm  />
  )
}

export default page
