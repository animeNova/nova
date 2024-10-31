import React from 'react'
interface DetailsProps {
    name :string;
    value : string;
}

const Details : React.FC<DetailsProps> = ({name = 'Type',value = 'TV'}) => {
  return (
    <div className='flex justify-start items-center gap-10'>
      <p className='text-white/70 text-xl'>{name}</p>
      <p className='text-xl'>{value}</p>
    </div>
  )
}

export default Details
