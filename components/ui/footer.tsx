"use client"
import { GitHubLogoIcon  } from '@radix-ui/react-icons'
import { FaXTwitter } from "react-icons/fa6";

import React from 'react'
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter()
  const handleRedirect = () => {
    const githuib = 'https://github.com/animeNova/nova'
    window.open(githuib, '_blank', 'noopener,noreferrer')
  }
  return (
    <footer className="py-6 px-4 md:px-8 md:py-0 dark:border-t border-foreground/10 border-t">
    <div className="flex  items-center justify-between w-full gap-4 md:h-24 ">
       <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push('/')}>
              <svg className="h-8 w-8 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
              </svg>
        </div>
        <div className='flex justify-center items-center gap-4 '>
            <GitHubLogoIcon className='h-7 w-7 cursor-pointer' onClick={() => handleRedirect()} />
        </div>
    </div>
  </footer>
  )
}

export default Footer
