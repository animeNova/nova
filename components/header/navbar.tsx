"use client"
import React from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { LoginDialog } from '../dialogs/LoginDaialog'
import ThemeChanger from '../ui/ThemeChanger'
import { Sidebar } from '../sidebar/Sidebar'
import { SideBarLinks } from '@/constant/sidebarLinks'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSession } from '@/app/lib/auth/client'
import UserButton from '../userbtn/userButton'
import { Button } from '../ui/button'
const Navbar = () => {
  const path = usePathname()
  const {data,isPending} = useSession();
  const router = useRouter()
  
  return (
    <header>
    <nav className="fixed top-0 left-0 right-0 bg-background border-b  z-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div className="hidden md:block ml-10">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="search"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className='hidden lg:block'>
            <ul className='flex justify-center items-center gap-2'>
              {SideBarLinks.map((link , index) => {
                  const isActive = path.endsWith(link.href);
                return (
                  <li key={index} className={cn('p-2 hover:bg-primary hover:text-white rounded-md transition',isActive && 'bg-primary text-white')}>
                    <Link href={link.href}>
                    {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flex justify-center items-center gap-2">
            {!data?.session && !isPending ? <LoginDialog /> : null}
            {data?.user?.role == "admin" && !isPending ? <Button onClick={() => router.push('/admin')}>Dashboard</Button>: null}
            {data?.session && !isPending ? <UserButton name={data.user.name} image={data.user.image} /> : null}
          <ThemeChanger />
          <Sidebar/>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
            />
          </div>
        </div>
      </div>
    </nav> 
    </header>
  )
}

export default Navbar