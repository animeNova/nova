import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import { signOut } from '@/app/lib/auth/client';
interface UserButtonProps {
    image ?: string;
    name :string;
}

const UserButton : React.FC<UserButtonProps> = ({image,name}) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar>
            <AvatarImage src={image} className='h-8 w-8 rounded-full' alt="@shadcn" />
            <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 ">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className='space-y-2'>
        {/* <DropdownMenuItem className='cursor-pointer'>
            Profile
            
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            Edit account
           
          </DropdownMenuItem> */}
          <DropdownMenuItem>
           <Button onClick={async () => await signOut()} variant={'destructive'} className='w-full'>Logout</Button>
           
          </DropdownMenuItem>
        </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
