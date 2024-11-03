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

const OrderbyFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderBy, setOrderBy] = React.useState<string>(
    searchParams.get("order") || ''
  )
  const onClick = (order :string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("order", order)
    router.push(`?${params.toString()}`)
  }
  useEffect(() =>{
    console.log(orderBy);
    
  },[])
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
