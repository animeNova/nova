
import React from 'react'
import UsersCard from '../components/users/UsersCard'
import { useSession } from '@/app/lib/auth/client'
import { auth } from '@/app/lib/auth'
import { headers } from 'next/headers'

const page =async () => {
  const data = await auth.api.getSession({
    headers : headers()
  })
  return (
    <div className="space-y-7">
          <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi Welcome back, {data?.user.name} 👋 
          </h2>
        </div>
        <div className="">
      <UsersCard />
    </div>
    </div>

  )
}

export default page
