import { getRelations } from '@/app/(root)/actions/shows/show'
import {useQuery} from '@tanstack/react-query'

export const useGetRelations = (id:string) => {
    return useQuery({
        queryKey : ['relations'] ,
        queryFn : () => getRelations(id)
    })
}