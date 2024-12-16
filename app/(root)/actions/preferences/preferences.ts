'use server';

import { auth } from "@/app/lib/auth";
import { db } from "@/drizzle";
import { userPreferences } from "@/drizzle/db/schema";
import { headers } from "next/headers";
import { z } from "zod";
import { prefrencesSchema } from "../../types/zod.types";


export const getUserPrefrences = async () => {
    const user =await auth.api.getSession({
        headers : await headers()
    })
  
    const results = await db.query.userPreferences.findMany({
        where : (_filed,{eq}) => eq(userPreferences.userId,user?.user.id!)
    })
    return results;
}

export const createPrefrences = async (_data : z.infer<typeof prefrencesSchema>) => {
    const {data,error} = prefrencesSchema.safeParse(_data);
    if(error){
        return {
            message : "Something went wrong!"
        }
    }
    const user = await auth.api.getSession({
        headers : await headers()
    })
    const genres = data.genres;
    const prefrences = genres.map((gen) => ({
        genreId : gen ,
        userId : user?.user.id
    }))
    await db.insert(userPreferences).values(prefrences)
    return {
        message :"success"
    }
}