import React from 'react'
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
interface OrderbyFilterProps {
    setOrderby : () => React.Dispatch<React.SetStateAction<string>>
}

const OrderbyFilter = () => {
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
            <DropdownMenuItem>
                all
            </DropdownMenuItem>
            <DropdownMenuItem>
                latest
            </DropdownMenuItem>
            <DropdownMenuItem>
                oldest
            </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OrderbyFilter
