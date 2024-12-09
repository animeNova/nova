import { getHeroRecommendation } from '@/app/(root)/actions/hero/hero'
import {useQuery} from '@tanstack/react-query'


export const useGetHeroRec = () => {
    return useQuery({
        queryKey : ['hero'] ,
        queryFn : () => getHeroRecommendation()
    })
}