import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '../components/sidebar/sidebar'
import { Button } from '@/components/ui/button'

const Provider = ({
    children
}: {children : React.ReactNode}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='space-y-4 w-full' >
        <SidebarTrigger />
        <div className='px-10 '>
                  {children}

        </div>
      </main>
    </SidebarProvider>
  )
}

export default Provider
