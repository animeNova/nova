"use client"
import React, { Suspense } from 'react'

const Wrapper = ({
    children
} : {children : React.ReactNode}) => {
  return (
    <Suspense>
      {children}
    </Suspense>
  )
}

export default Wrapper
