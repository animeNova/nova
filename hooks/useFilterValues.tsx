import { useGenreStore } from '@/store/useGenreStore'
import { useOrderStore } from '@/store/useOrderStore';
import { useSeasonStore } from '@/store/useSeasonStore';

const useFilterValues = () => {
  const {genres} = useGenreStore();
  const {season} = useSeasonStore();
  const {order} = useOrderStore()
  return {
    genres,
    season,
    order
  }
}

export default useFilterValues
