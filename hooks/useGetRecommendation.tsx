import { getEnhancedRecommendations } from '@/app/(root)/actions/recomended/recomended'
import {useQuery} from '@tanstack/react-query'


export const useGetRecommendation = () => {
    return useQuery({
        queryKey : ['recommendation'] ,
        queryFn : () => getEnhancedRecommendations()
    })
}