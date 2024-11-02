"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useState } from "react"

const mockSearchResults = [
    { id: 1, title: 'Dashboard', url: '/dashboard' },
    { id: 2, title: 'Analytics', url: '/analytics' },
    { id: 3, title: 'Settings', url: '/settings' },
    { id: 4, title: 'Profile', url: '/profile' },
  ];
  
export default function SearchBar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    const filteredResults = mockSearchResults.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
                  className="block w-full pl-10 pr-3 py-2 bg-background border rounded-md  outline-none leading-5 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                />
        </div>
        {isSearchOpen && searchQuery && (
                <div className="absolute mt-1 w-full bg-background rounded-md shadow-lg border">
                  <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {filteredResults.length > 0 ? (
                      filteredResults.map((result) => (
                        <li
                          key={result.id}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-secondary"
                          onClick={() => {
                            setSearchQuery('');
                            setIsSearchOpen(false);
                          }}
                        >
                          <div className="flex items-center">
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