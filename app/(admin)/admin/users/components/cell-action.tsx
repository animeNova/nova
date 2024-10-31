"use client";

import { DropdownMenu ,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {Copy,MoreHorizontal} from 'lucide-react'
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';
import {User} from './columns'
interface CellActionProps {
    data : User;
}
export const CellAction : React.FC<CellActionProps> = ({data}) => {
    const [open,SetOpen] = useState<boolean>(false)
    const [loading,SetLoading] = useState<boolean>(false)
    const router = useRouter()

    const onCopy = () => {
        navigator.clipboard.writeText(data?.id)
        toast.success("Id Coppied!")
    }
  
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={onCopy}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Id
                </DropdownMenuItem> 
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}