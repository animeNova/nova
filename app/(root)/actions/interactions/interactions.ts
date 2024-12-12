"use server";

import { generateEmbeddings } from "@/app/(admin)/lib/embeddings";
import { auth } from "@/app/lib/auth";
import { db } from "@/drizzle";
import { userInteractionsTable } from "@/drizzle/db/schema";
import { headers } from "next/headers";
interface createInteractionProps {
    type : 'like' | 'watch' |'rate' | 'click' ,
    showId:string
}

export const createInteraction = async ({
    type ,
    showId
}:createInteractionProps) => {
    const isAuth =await auth.api.getSession({
        headers : await headers()
    })
    if(!isAuth){
        return {message :"You are not authurized!"}
    }
    const vector =await generateEmbeddings(`${type} ${showId}`);
    // Insert interaction into the database
    await db.insert(userInteractionsTable).values({
      interactionType: type,
      movieId:showId,
      userId:isAuth.user.id, 
      vector,
    });
    
}