"use client";

import { DropdownMenu ,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {Copy, Edit, MoreHorizontal, Trash} from 'lucide-react'
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from '@/components/modal/alert-modal';
import toast from 'react-hot-toast';
import {Character} from './columns'
import { deleteCharacter } from "@/app/(admin)/actions/characters/characters.action";
interface CellActionProps {
    data : Character;
}
export const CellAction : React.FC<CellActionProps> = ({data}) => {
    const [open,SetOpen] = useState<boolean>(false)
    const [loading,SetLoading] = useState<boolean>(false)
    const router = useRouter()
    const params = useParams<{id:string}>()
    const onCopy = () => {
        navigator.clipboard.writeText(data?.id)
        toast.success("Id Coppied!")
    }
    const onDelete = async () => {
        try {
          SetLoading(true)
          await deleteCharacter(data.id)
          toast.success("Character Deleted Succefully!");
          router.refresh()
        } catch (error) {
            toast.error("Something went Wrong!")
        } finally {
          SetOpen(false)
          SetLoading(false)
        }
      }
    return (
        <>
       <AlertModal isOpen={open} onClose={() => SetOpen(false)} loading={loading} onConfirm={onDelete}   />
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
                <DropdownMenuItem onClick={() => {
                    router.push(`/admin/shows/${params.id}/characters/update/${data.id}`)
                }}>
                    <Edit className="mr-2 h-4 w-4" />
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => SetOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}