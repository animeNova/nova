"use server";

import { db } from "@/drizzle";
import { QueryPorps } from "../../types";
import { asc, count, desc, eq } from "drizzle-orm";
import { genre } from "@/drizzle/db/schema";
import { z } from "zod";
import { genreSchema } from "../../types/zod.types";
import { revalidatePath } from "next/cache";

export const getGenres = async (query : QueryPorps) => {
    const {limit= 12,orderBy ='asc',page =1} = query;
    const offset = (page - 1) * limit;
    const totalGenresResult  = await db.select({count: count() }).from(genre);
    const result = await db.select({
        id : genre.id ,
        title : genre.title
    }).from(genre).orderBy(orderBy == 'asc' ? asc(genre.createdAt) : desc(genre.createdAt)).offset(offset).limit(limit)
    const totalGenres = totalGenresResult[0].count;

    // Calculate if there's a next page
    const hasNextPage = page * limit < totalGenres;
    return {
        totalGenres : totalGenres ,
        currentpage : Number(page) ,
        hasNextPage,
        result,
        totalPages: Math.ceil(totalGenres / limit),
    }
}
export const getAllGenres = async () => {

    const result = await db.select({
        id : genre.id ,
        title : genre.title
    }).from(genre)


    return {
        result,
    }
}

export const createGenre = async (_data : z.infer<typeof genreSchema>) => {
   const {data,error} = genreSchema.safeParse(_data) 
   if(error){
    return {error : error}
   }
   const {title} = data
   await db.insert(genre).values({
    title : title 
   })
   revalidatePath('/admin/genres')
   return {
    success :"Genre Created Successfuly!"
   }

}

export const getGenre = async (id : string) => {
    const result = await db.query.genre.findFirst({
       where : (_genre , {eq}) => eq(_genre.id,id),
       
    })
    if(!result){
        return {error : "Genre was Not Found!"}
    }
    return result;
}
export const updateGenre = async (id : string , _data : z.infer<typeof genreSchema>) => {
    const {data,error} = genreSchema.safeParse(_data) 
    if(error){
     return {error : error}
    }
    const {title} = data;
    await db.update(genre).set({
        title : title
    }).where(eq(genre.id,id))
    revalidatePath('/admin/genres')
    return {
     success :"Genre Updated Successfuly!"
    }
}
export const deleteGenre = async (id : string) => {
    const exist = await db.query.genre.findFirst({
        where : (_genre , {eq}) => eq(_genre.id,id),
    });
    if(!exist){
        return {error : "Genre was Not Found!"}
    }
    await db.delete(genre).where(eq(genre.id,exist.id));
    revalidatePath('/admin/genres')
    return {
        success :"Genre Deleted Successfuly!"
       }
}