import { useGenresStore } from '@/store/useGenreStore'
import { useSeasonStore } from '@/store/useSeasonStore';
import React from 'react'

const useFilterValues = () => {
  const {genres} = useGenresStore();
  const {season} = useSeasonStore()
  return {
    genres,
    season
  }
}

export default useFilterValues
