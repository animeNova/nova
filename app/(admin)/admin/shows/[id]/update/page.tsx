import { getshow } from '@/app/(admin)/actions/show/show.server'
import React from 'react'
import { ShowForm } from '../../components/show-form';
import { getAllGenres } from '@/app/(admin)/actions/genre/genre.action';

import { getAllStudios } from '@/app/(admin)/actions/studio/studio.action';
import { getAllCreators } from '@/app/(admin)/actions/creator/creator.action';
import { getAllLanguages } from '@/app/(admin)/actions/languages/language.action';

interface PageProps {
    params : {
        id : string
    }
}

const page =async (params : PageProps) => {
    const data = await getshow(params.params.id);
    const genres = await getAllGenres()
    const studio = await getAllStudios()
    const creators = await getAllCreators()
    const languages = await getAllLanguages()
    
  return (
    <>
      <ShowForm initialData={data}  genres={genres.result} creators={creators.result} languages={languages.result} studios={studio.result} />
    </>
  )
}

export default page
