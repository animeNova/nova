"use server";

import { db } from "@/drizzle";
import { QueryPorps } from "../../types";
import { asc, count, desc, eq } from "drizzle-orm";
import { studio } from "@/drizzle/db/schema";
import { z } from "zod";
import { StudioSchema } from "../../types/zod.types";
import { revalidatePath } from "next/cache";

export const getStudios = async (props : QueryPorps) => {
    const {limit = 12,orderBy = 'desc',page = 1} = props;

    const offset = (page - 1) * limit;
    const totalstudioResult  = await db.select({count: count() }).from(studio);
    const result = await db.select({
        id : studio.id ,
        name : studio.title ,
        image : studio.image
    }).from(studio).orderBy(orderBy == 'asc' ? asc(studio.createdAt) : desc(studio.createdAt)).offset(offset).limit(limit)
    const totalstudio = totalstudioResult[0].count;

    // Calculate if there's a next page
    const hasNextPage = page * limit < totalstudio;
    return {
        totalstudio : totalstudio ,
        currentpage : Number(page) ,
        hasNextPage,
        result,
        totalPages: Math.ceil(totalstudio / limit),
    }

}
export const getAllStudios = async () => {


    const result = await db.select({
        id : studio.id ,
        name : studio.title ,
        image : studio.image
    }).from(studio)
    return {
        result
    }

}

export const getStudio = async (id:string) => {
    const result = await db.query.studio.findFirst({
        where : (_studio , {eq}) => eq(_studio.id,id),
     })
     if(!result){
         return {error : "studio was Not Found!"}
     }
     return result;
}

export const createStudio = async (_data : z.infer<typeof StudioSchema>) => {
    const {data,error} = StudioSchema.safeParse(_data);
    if(error){
        return {error : error}
    }
    const {name,image} = data;
    await db.insert(studio).values({
        title : name ,
        image : image
    }) 
    revalidatePath('/admin/Studio')
    return {
     success :"studio Created Successfuly!"
    }


}

export const updateStudio = async (id : string , _data : z.infer<typeof StudioSchema>) => {
    const {data,error} = StudioSchema.safeParse(_data) 
    if(error){
     return {error : error}
    }
    const {image,name} = data;
    await db.update(studio).set({
        title : name ,
        image : image
    }).where(eq(studio.id,id))
    revalidatePath('/admin/Studio')
    return {
     success :"Studio Updated Successfuly!"
    }
}

export const deleteStudio = async (id : string) => {
    const exist = await db.query.studio.findFirst({
        where : (_studio , {eq}) => eq(_studio.id,id),
    });
    if(!exist){
        return {error : "Studio was Not Found!"}
    }
    await db.delete(studio).where(eq(studio.id,exist.id));
    revalidatePath('/admin/languages')
    return {
        success :"Studio Deleted Successfuly!"
       }
}