"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Studio = {
   id :string ;
   name : string ;
   image ?:string | null
}

export const columns: ColumnDef<Studio>[] = [

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell : ({row}) => <Image src={row.original.image!} width={1000} height={1000} alt="" className="h-8 w-8 rounded-full"  />
  },
  {
    id : "actions", 
    cell : ({row}) => <CellAction data={row.original} />
}
]
