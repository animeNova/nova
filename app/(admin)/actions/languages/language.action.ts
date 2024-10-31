"use server";

import { db } from "@/drizzle";
import { QueryPorps } from "../../types";
import { asc, count, desc, eq } from "drizzle-orm";
import { language } from "@/drizzle/db/schema";
import { z } from "zod";
import { languageSchema } from "../../types/zod.types";
import { revalidatePath } from "next/cache";

export const getLanguages = async (query : QueryPorps) => {
    const {limit= 12,orderBy ='asc',page =1} = query;
    const offset = (page - 1) * limit;
    const totalLanguagesResult  = await db.select({count: count() }).from(language);
    const result = await db.select({
        id : language.id ,
        title : language.title
    }).from(language).orderBy(orderBy == 'asc' ? asc(language.createdAt) : desc(language.createdAt)).offset(offset).limit(limit)
    const totalGenresLanguages = totalLanguagesResult[0].count;

    // Calculate if there's a next page
    const hasNextPage = page * limit < totalGenresLanguages;
    return {
        totalGenres : totalGenresLanguages ,
        currentpage : Number(page) ,
        hasNextPage,
        result,
        totalPages: Math.ceil(totalGenresLanguages / limit),
    }
}
export const getAllLanguages = async () => {
    const result = await db.select({
        id : language.id ,
        title : language.title
    }).from(language)

    return {
        result
        }
}

export const createLanguage = async (_data : z.infer<typeof languageSchema>) => {
   const {data,error} = languageSchema.safeParse(_data) 
   if(error){
    return {error : error}
   }
   const {title} = data
   await db.insert(language).values({
    title : title 
   })
   revalidatePath('/admin/languages')
   return {
    success :"Languages Created Successfuly!"
   }

}

export const getLanguage = async (id : string) => {
    const result = await db.query.language.findFirst({
       where : (_language , {eq}) => eq(_language.id,id),
    })
    if(!result){
        return {error : "Language was Not Found!"}
    }
    return result;
}
export const updateLanguage = async (id : string , _data : z.infer<typeof languageSchema>) => {
    const {data,error} = languageSchema.safeParse(_data) 
    if(error){
     return {error : error}
    }
    const {title} = data;
    await db.update(language).set({
        title : title
    }).where(eq(language.id,id))
    revalidatePath('/admin/languages')
    return {
     success :"Languages Updated Successfuly!"
    }
}
export const deleteLanguage = async (id : string) => {
    const exist = await db.query.genre.findFirst({
        where : (_language , {eq}) => eq(_language.id,id),
    });
    if(!exist){
        return {error : "Language was Not Found!"}
    }
    await db.delete(language).where(eq(language.id,exist.id));
    revalidatePath('/admin/languages')
    return {
        success :"Languages Deleted Successfuly!"
       }
}