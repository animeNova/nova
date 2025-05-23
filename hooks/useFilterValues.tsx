import { useGenresStore } from '@/store/useGenreStore'
import { useOrderStore } from '@/store/useOrderStore';
import { useSeasonStore } from '@/store/useSeasonStore';
import { useTypeStore } from '@/store/useTypeStore';
import React from 'react'

const useFilterValues = () => {
  const {genres} = useGenresStore();
  const {season} = useSeasonStore();
  const {order} = useOrderStore();
  const {type} = useTypeStore();
  return {
    genres,
    season,
    order,
    type
  }
}

export default useFilterValues
