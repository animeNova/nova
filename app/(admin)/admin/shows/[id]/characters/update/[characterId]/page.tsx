import { getCharacter } from '@/app/(admin)/actions/characters/characters.action'
import React from 'react'
import { CharacterForm } from '../../components/character-form';

interface PageProps {
    params : Promise<{
      characterId : string
    }>
}

const page =async (params : PageProps) => {
    const data = await getCharacter((await params.params).characterId);
  
  return (
    <>
      <CharacterForm initialData={data} />
    </>
  )
}

export default page
