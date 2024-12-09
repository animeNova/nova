import { getRecommendation, getShows } from '@/app/(root)/actions/shows/show'
import {useQuery} from '@tanstack/react-query'
import { QueryPorps } from "@/app/(admin)/types";

export const useGetRecommend = (id:string) => {
    return useQuery({
        queryKey : ['recommend'] ,
        queryFn : () => getRecommendation(id)
    })
}