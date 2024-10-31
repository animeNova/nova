"use server";

import { db } from "@/drizzle";
import { QueryPorps } from "../../types";
import { asc, count, desc, eq } from "drizzle-orm";
import { creator } from "@/drizzle/db/schema";
import { z } from "zod";
import { creatorSchema } from "../../types/zod.types";
import { revalidatePath } from "next/cache";

export const getCreators = async (props : QueryPorps) => {
    const {limit = 12,orderBy = 'desc',page = 1} = props;

    const offset = (page - 1) * limit;
    const totalcreatorResult  = await db.select({count: count() }).from(creator);
    const result = await db.select({
        id : creator.id ,
        name : creator.name ,
        age : creator.age ,
        image : creator.image
    }).from(creator).orderBy(orderBy == 'asc' ? asc(creator.createdAt) : desc(creator.createdAt)).offset(offset).limit(limit)
    const totalcreator = totalcreatorResult[0].count;

    // Calculate if there's a next page
    const hasNextPage = page * limit < totalcreator;
    return {
        totalcreator : totalcreator ,
        currentpage : Number(page) ,
        hasNextPage,
        result,
        totalPages: Math.ceil(totalcreator / limit),
    }

}
export const getAllCreators = async () => {



    const result = await db.select({
        id : creator.id ,
        name : creator.name ,
        age : creator.age ,
        image : creator.image
    }).from(creator)

    // Calculate if there's a next page

    return {
        result    
    }

}

export const getCreator = async (id:string) => {
    const result = await db.query.creator.findFirst({
        where : (_creator , {eq}) => eq(_creator.id,id),
     })
     if(!result){
         return {error : "creator was Not Found!"}
     }
     return result;
}

export const createCreator = async (_data : z.infer<typeof creatorSchema>) => {
    const {data,error} = creatorSchema.safeParse(_data);
    if(error){
        return {error : error}
    }
    const {age,name,image} = data;
    await db.insert(creator).values({
        name : name ,
        age : Number(age) ,
        image : image
    }) 
    revalidatePath('/admin/creators')
    return {
     success :"creator Created Successfuly!"
    }


}

export const updateCreator = async (id : string , _data : z.infer<typeof creatorSchema>) => {
    const {data,error} = creatorSchema.safeParse(_data) 
    if(error){
     return {error : error}
    }
    const {age,image,name} = data;
    await db.update(creator).set({
        name : name ,
        age : Number(age) ,
        image : image
    }).where(eq(creator.id,id))
    revalidatePath('/admin/creators')
    return {
     success :"Creator Updated Successfuly!"
    }
}

export const deleteCreator = async (id : string) => {
    const exist = await db.query.creator.findFirst({
        where : (_creator , {eq}) => eq(_creator.id,id),
    });
    if(!exist){
        return {error : "Creator was Not Found!"}
    }
    await db.delete(creator).where(eq(creator.id,exist.id));
    revalidatePath('/admin/creators')
    return {
        success :"Creator Deleted Successfuly!"
       }
}