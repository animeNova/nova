"use client";

import { DropdownMenu ,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {Copy, Edit, MoreHorizontal, PersonStanding, Trash} from 'lucide-react'
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from '@/components/modal/alert-modal';
import toast from 'react-hot-toast';
import {Show} from './columns'
import { deleteshow } from "@/app/(admin)/actions/show/show.server";
interface CellActionProps {
    data : Show;
}
export const CellAction : React.FC<CellActionProps> = ({data}) => {
    const [open,SetOpen] = useState<boolean>(false)
    const [loading,SetLoading] = useState<boolean>(false)
    const router = useRouter()

    const onCopy = () => {
        navigator.clipboard.writeText(data?.id)
        toast.success("Id Coppied!")
    }
    const onDelete = async () => {
        try {
          SetLoading(true)
          await deleteshow(data.id)
          toast.success("Show Deleted Succefully!");
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
                    router.push(`/admin/shows/${data.id}/characters`)
                }}>  
                <PersonStanding className="mr-2 h-4 w-4" />
                 Characters
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    router.push(`/admin/shows/${data.id}/update`)
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