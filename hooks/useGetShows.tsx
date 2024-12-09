import { getShows } from '@/app/(root)/actions/shows/show'
import {useQuery} from '@tanstack/react-query'
import { QueryPorps } from "@/app/(admin)/types";

export const useGetShows = (query : QueryPorps) => {
    return useQuery({
        queryKey : ['shows'] ,
        queryFn : () => getShows(query)
    })
}