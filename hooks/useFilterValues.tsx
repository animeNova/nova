import { useGenresStore } from '@/store/useGenreStore'
import { useOrderStore } from '@/store/useOrderStore';
import { useSeasonStore } from '@/store/useSeasonStore';
import React from 'react'

const useFilterValues = () => {
  const {genres} = useGenresStore();
  const {season} = useSeasonStore();
  const {order} = useOrderStore();
  return {
    genres,
    season,
    order
  }
}

export default useFilterValues
