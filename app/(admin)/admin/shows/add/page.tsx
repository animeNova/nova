import React from 'react'
import { ShowForm } from '../components/show-form'
import { getAllGenres } from '@/app/(admin)/actions/genre/genre.action'
import { getAllStudios } from '@/app/(admin)/actions/studio/studio.action'
import { getAllCreators } from '@/app/(admin)/actions/creator/creator.action'
import { getAllLanguages } from '@/app/(admin)/actions/languages/language.action'

const page =async () => {
  const genres = await getAllGenres()
  const studio = await getAllStudios()
  const creators = await getAllCreators()
  const languages = await getAllLanguages()
  return (
    <ShowForm  genres={genres.result} studios={studio.result}  creators={creators.result} languages={languages.result}  />
  )
}

export default page
