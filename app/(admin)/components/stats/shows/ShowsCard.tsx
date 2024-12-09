import React from 'react'
import InfoCard from '../../info/InfoCard'
import { Clapperboard } from 'lucide-react'
import { getShowsCountsByMonth } from '@/app/(admin)/actions/show/show.server'

const ShowsCard =async () => {
    const shows =await getShowsCountsByMonth()
   
    
  return (
    <>
    <InfoCard title='Total Shows' icon={<Clapperboard size={20} />} linkTo='/admin/shows' description='this is the shows growth' totalCount={shows.totalShowsResult} data={shows.ShowsData}  />
    
    </>
  )
}

export default ShowsCard
