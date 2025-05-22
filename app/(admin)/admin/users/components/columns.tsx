"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { useSession } from "@/app/lib/auth/client";
import { UserRoleDropdown } from "@/components/ui/user-role-dropdown";
import UserAvatar from "@/components/ui/user-avatar";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
   id:string ,
   username:string,
   image:string | null,
   email:string;
   role:string | null;
}

export const columns: ColumnDef<User>[] = [

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Image", 
    cell : ({row}) => <UserAvatar url={row.original.image!} className="w-6 h-6 rounded-full" />
  },
  {
    accessorKey: "role",
    header: "Role" 
  },
  {
    id : "actions", 
    cell : ({row}) => <CellAction data={row.original} />
}
]
