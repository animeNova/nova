import React from 'react'
import Preferences from '../../components/prefrences'
import { getGenres } from '@/app/(root)/actions/genres/genres'

const  page =async () => {
  const genres = await getGenres()
  return (
    <div>
      <Preferences genres={genres} />
    </div>
  )
}

export default page
