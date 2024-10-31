import { GitHubLogoIcon  } from '@radix-ui/react-icons'
import { FaXTwitter } from "react-icons/fa6";

import React from 'react'

const Footer = () => {
  return (
    <footer className="py-6 px-4 md:px-8 md:py-0 dark:border-t border-secondary border-t">
    <div className="flex  items-center justify-between w-full gap-4 md:h-24 ">
       <div className="flex-shrink-0">
              <svg className="h-8 w-8 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
              </svg>
        </div>
        <div className='flex justify-center items-center gap-4 '>
            <GitHubLogoIcon className='h-7 w-7' />
            <FaXTwitter className='h-7 w-7'  />
        </div>
    </div>
  </footer>
  )
}

export default Footer
