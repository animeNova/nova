import React from 'react'

interface HeaderProps{
    title :string;
    description ?: string
}

const Header : React.FC<HeaderProps> = ({title,description}) => {
  return (
    <div className='flex items-center gap-2'>
      <div className='h-10 w-2 bg-primary'/>
    <div className='flex flex-col gap-2'>
    <h1 className='text-3xl font-semibold  dark:text-white/90'>{title}</h1>
    {description && <p className=' text-white/70'>{description}</p>}
    </div>

    </div>
  )
}

export default Header
