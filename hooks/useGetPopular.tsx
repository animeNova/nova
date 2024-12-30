import { getBestOfYear, getPopular } from '@/app/(root)/actions/shows/show'
import {useQuery} from '@tanstack/react-query'

export const useGetPopular = () => {
    return useQuery({
        queryKey : ['popular'] ,
        queryFn : () => getPopular()
    })
}