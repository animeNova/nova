"use client";
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from "next/navigation"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ListFilter } from 'lucide-react'
import { useOrderStore } from '@/store/useOrderStore';

const OrderbyFilter = () => {
  const {setOrder} = useOrderStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <ListFilter className='cursor-pointer' size={25} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
            <DropdownMenuItem>
                OrderBy
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOrder('desc')}>
                latest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOrder('asc')}>
                oldest
            </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OrderbyFilter