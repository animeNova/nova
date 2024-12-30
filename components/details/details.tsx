import React from 'react'
interface DetailsProps {
    name :string;
    value : string;
}

const Details : React.FC<DetailsProps> = ({name = 'Type',value = 'TV'}) => {
  return (
    <div className='flex gap-5'>
      <p className='text-foreground/70 text-xl'>{name}</p>
      <p className='text-xl'>{value}</p>
    </div>
  )
}

export default Details
