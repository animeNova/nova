import React from 'react'

interface CharactersWrapperProps {
    children : React.ReactNode
}

const StaffsWrapper : React.FC<CharactersWrapperProps> = ({children}) => {
  return (
    <div className='flex justify-start items-center gap-2 flex-wrap'>
      {children}
    </div>
  )
}

export default StaffsWrapper
