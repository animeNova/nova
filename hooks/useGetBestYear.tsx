import { getBestOfYear } from '@/app/(root)/actions/shows/show'
import {useQuery} from '@tanstack/react-query'

export const useGetBestYear = () => {
    return useQuery({
        queryKey : ['best-year'] ,
        queryFn : () => getBestOfYear()
    })
}