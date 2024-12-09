import { getPinnedShows } from '@/app/(root)/actions/pinned/pinned'
import {useQuery} from '@tanstack/react-query'


export const useGetPinned = () => {
    return useQuery({
        queryKey : ['pinned'] ,
        queryFn : () => getPinnedShows()
    })
}