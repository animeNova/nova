"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image";
import { formatDistance } from "date-fns";
import PinButton from "@/app/(admin)/components/pinShow/PinButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Show = {
    title : string;
    id :string;
    description:string;
    rating:number;
    image:string | null;
    status:string;
    season:string;
    type:string;
    secondTitle : string,
    airing:string
}

export const columns: ColumnDef<Show>[] = [

  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "secondTitle",
    header: "relativeTitle",
  },
  {
    accessorKey: "season",
    header: "Season",
  },
  {
    accessorKey: "season",
    header: "Season",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell : ({row}) => <p className="line-clamp-1 max-w-36">{row.original.description}</p>
  },
  {
    accessorKey: "airing",
    header: "Airing",
  },
  {
    accessorKey: "image",
    header: "Poster",
    cell : ({row}) => <Image src={row.original.image!} width={1000} height={1000} alt="" className="w-8 h-8 rounded-full"/>
  },
  {
    id : "actions", 
    cell : ({row}) => <CellAction data={row.original} />
  },
  {
    id : "pin", 
    cell : ({row}) => <PinButton showId={row.original.id} />
  }
]
