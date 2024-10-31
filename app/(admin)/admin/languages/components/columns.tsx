"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Language = {
    title : string ,
    id :string
}

export const columns: ColumnDef<Language>[] = [

  {
    accessorKey: "title",
    header: "Title",
  },
  {
    id : "actions", 
    cell : ({row}) => <CellAction data={row.original} />
}
]
