"use server";

import { auth } from "@/app/lib/auth";
import { db } from "@/drizzle";
import { watching } from "@/drizzle/db/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";


export const AddWatching =async (showId :string) => {
   
 
    const result = await db.select({
        id : watching.id ,
        showId : watching.showId ,
        userId : watching.userId
    }).from(watching).where(and(eq(watching.showId,showId),eq(watching.userId,"wXj6CRcsDyP8loJpEjReL")))
    if(result.length){
     await db.delete(watching).where(and(eq(watching.showId,showId),eq(watching.userId,"wXj6CRcsDyP8loJpEjReL")))
     return {
        message :"Show Deleted Successfuly!"
     }
    }
    await db.insert(watching).values({
        showId:showId,
        userId : "wXj6CRcsDyP8loJpEjReL"
    })
    return {
          message :"Show Added Successfuly!"
    }
}

export const getIsWatching = async (showId :string) => {
    const result = await db.select({
        id : watching.id ,
        showId : watching.showId ,
        userId : watching.userId
    }).from(watching).where(and(eq(watching.showId,showId),eq(watching.userId,"wXj6CRcsDyP8loJpEjReL")))
    return result;
}