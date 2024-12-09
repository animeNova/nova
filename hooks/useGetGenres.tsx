import { getGenres } from '@/app/(root)/actions/genres/genres'
import {useQuery} from '@tanstack/react-query'


export const useGetGenres = () => {
    return useQuery({
        queryKey : ['genres'] ,
        queryFn : () => getGenres()
    })
}