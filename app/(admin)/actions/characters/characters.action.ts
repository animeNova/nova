"use server";

import { db } from "@/drizzle";
import { QueryPorps } from "../../types";
import { asc, count, desc, eq } from "drizzle-orm";
import {  charachter, charachter as Character, show } from "@/drizzle/db/schema";
import { z } from "zod";
import { characterSchema } from "../../types/zod.types";
import { revalidatePath } from "next/cache";

export const getCharacters = async (props : QueryPorps,showid :string) => {
    const {limit = 12,orderBy = 'desc',page = 1} = props;

    const offset = (page - 1) * limit;
    const totalCharacterResult  = await db.select({count: count() }).from(Character).where(eq(Character.showId , showid));
    const result = await db.select({
        id : Character.id ,
        name : Character.name ,
        image : Character.image ,
        showId: show.id,
        showTitle: show.title,
    }).from(Character).leftJoin(show, eq(show.id,Character.showId)).orderBy(orderBy == 'asc' ? asc(Character.createdAt) : desc(Character.createdAt)).offset(offset).limit(limit).where(eq(Character.showId , showid))
    const totalCharacter = totalCharacterResult[0].count;

    // Calculate if there's a next page
    const hasNextPage = page * limit < totalCharacter;
    return {
        totalCharacter : totalCharacter ,
        currentpage : Number(page) ,
        hasNextPage,
        result,
        totalPages: Math.ceil(totalCharacter / limit),
    }

}
export const getAllCharacters = async () => {
    const result = await db.select({
        id : Character.id ,
        name : Character.name ,
        image : Character.image
    }).from(Character)
    return {
        result,
    }
}

export const getCharacter = async (id:string) => {
    const result = await db.query.charachter.findFirst({
        where : (_Character , {eq}) => eq(_Character.id,id),
     })
     if(!result){
         return {error : "Character was Not Found!"}
     }
     return result;
}

export const createCharacter = async (_data : z.infer<typeof characterSchema>) => {
    const {data,error} = characterSchema.safeParse(_data);
    if(error){
        return {error : error}
    }
    const {name,image,showId} = data;
    await db.insert(Character).values({
        name : name ,
        image : image,
        showId:showId,
    }) 
    revalidatePath('/admin/Characters')
    return {
     success :"Character Created Successfuly!"
    }


}

export const updateCharacter = async (id : string , _data : z.infer<typeof characterSchema>) => {
    const {data,error} = characterSchema.safeParse(_data) 
    if(error){
     return {error : error}
    }
    const {image,name,showId} = data;
    await db.update(Character).set({
        name : name ,
        image : image ,
        showId : showId
    }).where(eq(Character.id,id))
    revalidatePath(`/admin/shows/${showId}/characters`)
    return {
     success :"Character Updated Successfuly!"
    }
}

export const deleteCharacter = async (id : string) => {
    try {
        const exist = await db.select({
            id : Character.id ,
            showId : charachter.showId
        }).from(Character).where(eq(Character.id,id))
        if(!exist){
            return {error : "Character was Not Found!"}
        }
        await db.delete(Character).where(eq(Character.id,exist[0].id));
        revalidatePath(`/admin/shows/${exist[0].showId}/characters`)
        return {
            success :"Character Deleted Successfuly!"
           }
    } catch (error) {
        console.log(error);
        
    }

}