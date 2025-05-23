
import { useRouter } from 'next/navigation';
import React from 'react'
interface DetailsProps {
    name :string;
    value : string;
    link ?: string;
}

const Details : React.FC<DetailsProps> = ({name = 'Type',value = 'TV',link}) => {
  const router = useRouter();
  const onClick = () => {
    if(link){
      router.push(link)
    }
  }
  return (
    <div className='flex gap-5'>
      <p className={`text-foreground/70 text-xl`}>{name}</p>
      <p className={`text-xl cursor-pointer ${link && 'hover:underline'}`} onClick={onClick}>{value}</p>
    </div>
  )
}

export default Details
