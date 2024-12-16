"use client";
import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,

    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ListFilter } from 'lucide-react'
import { useOrderStore } from '@/store/useOrderStore';

const OrderbyFilter = () => {
  const {setOrder} = useOrderStore()
  const onClick = (order : 'desc' | 'asc') => {
    setOrder(order)
  }

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
            <DropdownMenuItem onClick={() => onClick('desc')}>
                latest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onClick('asc')}>
                oldest
            </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OrderbyFilter