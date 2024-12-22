"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/useDebounce";
import { getSearch } from "@/app/(root)/actions/shows/show";
import { useRouter } from "next/navigation";
import Image from "next/image";

  
export default function SearchBar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [loading , setLoading] = useState(false)
    const [notices,setNotices] = useState<{id:string;title:string;image:string}[]>([])
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter()
    const debouncedSearch = useDebounce(searchQuery , 500)
    useEffect(() => {
      // search the api
  
      async function fetchData() {
          setLoading(true) 
          const result = await getSearch(searchQuery);
          console.log(result);
          
          setNotices(result)
          }
      
          if(debouncedSearch) fetchData()
    },[debouncedSearch])
  return (
  <>
        {/* Search Bar */}
        <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 bg-background border dark:border border-foreground/10 rounded-md  outline-none leading-5 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                />
        </div>
        {isSearchOpen && searchQuery && (
                <div className="absolute mt-1 w-full bg-background rounded-md shadow-lg border">
                  <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {notices.length > 0 ? (
                      notices.map((result) => (
                        <li
                          key={result.id}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-secondary"
                          onClick={() => {
                            setSearchQuery('');
                            setIsSearchOpen(false);
                            router.push(`/anime/${result.id}`)
                          }}
                        >
                          <div className="flex justify-start items-center">
                            {/* <Image src={result.image} width={500} height={500} className="w-6 h-6 rounded-full object-cover" alt={result.title} />  */}
                            <span className="ml-3 block font-medium truncate">{result.title}</span>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="cursor-default select-none relative py-2 pl-3 pr-9">
                        <div className="flex items-center">
                          <span className="ml-3 block text-gray-500">No results found</span>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
        </div>
  </>
  )
}