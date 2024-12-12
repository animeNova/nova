import React from 'react'
import { CharacterForm } from '../components/character-form'
import { getshow } from '@/app/(admin)/actions/show/show.server'
import { redirect } from 'next/navigation';

const page = async (props: {params : Promise<{id : string}>}) => {
  const params = await props.params;

  const {
    id
  } = params;

  const show = await getshow(id);
  if(!show){
    redirect('/admin/shows')
  }
  return (
    <CharacterForm  />
  )
}

export default page
