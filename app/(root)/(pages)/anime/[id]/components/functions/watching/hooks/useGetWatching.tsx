import {useQuery} from '@tanstack/react-query'
import { getIsWatching } from '../actions/watching.action'


export const useGetWatching = (showId : string) => {
    return useQuery({
        queryKey : ['watching'] ,
        queryFn : () => getIsWatching(showId)
    })
}