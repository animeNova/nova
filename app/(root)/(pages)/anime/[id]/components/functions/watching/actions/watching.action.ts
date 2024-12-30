"use server";

import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { headers } from "next/headers";


export const AddWatching =async (showId :string) => {
   
    const user = await auth.api.getSession({
        headers :await headers(),
    })
    if(!user){
        return null;
    }
    const result = await db.watching.findFirst({
        where :{
            showId : showId ,
            userId : user?.user.id
        } ,
        select :{
            id:true,
            userId:true,
            showId:true
        }
    })
    if(result){
     await db.watching.deleteMany({
        where :{
            userId : user?.user.id,
            showId : showId
        }
     })
     return {
        message :"Show Deleted Successfuly!"
     }
    }
    await db.watching.create({
        data :{
            userId:user.user.id,
            showId : showId
        }
    })
    return {
          message :"Show Added Successfuly!"
    }
}

export const getIsWatching = async (showId :string) => {
  
    const user = await auth.api.getSession({
        headers :await headers(),
    })
    if(!user){
        return null;
    }
    const result = await db.watching.findFirst({
        where :{
            showId : showId ,
            userId : user?.user.id
        } ,
        select :{
            id:true,
            userId:true,
            showId:true
        }
    })
    return result;
}