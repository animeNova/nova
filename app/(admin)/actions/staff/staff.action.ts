"use server";

import { db } from "@/drizzle";
import { QueryPorps } from "../../types";
import { asc, count, desc, eq } from "drizzle-orm";
import { cast } from "@/drizzle/db/schema";
import { z } from "zod";
import { staffSchema } from "../../types/zod.types";
import { revalidatePath } from "next/cache";

export const getStaffs = async (props : QueryPorps) => {
    const {limit = 12,orderBy = 'desc',page = 1} = props;

    const offset = (page - 1) * limit;
    const totalCastResult  = await db.select({count: count() }).from(cast);
    const result = await db.select({
        id : cast.id ,
        name : cast.name ,
        age : cast.age ,
        job : cast.job ,
        image : cast.image
    }).from(cast).orderBy(orderBy == 'asc' ? asc(cast.createdAt) : desc(cast.createdAt)).offset(offset).limit(limit)
    const totalCast = totalCastResult[0].count;

    // Calculate if there's a next page
    const hasNextPage = page * limit < totalCast;
    return {
        totalCast : totalCast ,
        currentpage : Number(page) ,
        hasNextPage,
        result,
        totalPages: Math.ceil(totalCast / limit),
    }

}
export const getAllStaffs = async () => {
    const result = await db.select({
        id : cast.id ,
        name : cast.name ,
        age : cast.age ,
        job : cast.job ,
        image : cast.image
    }).from(cast)
    return {
        result,
    }
}

export const getStaff = async (id:string) => {
    const result = await db.query.cast.findFirst({
        where : (_cast , {eq}) => eq(_cast.id,id),
     })
     if(!result){
         return {error : "Cast was Not Found!"}
     }
     return result;
}

export const createStaff = async (_data : z.infer<typeof staffSchema>) => {
    const {data,error} = staffSchema.safeParse(_data);
    if(error){
        return {error : error}
    }
    const {age,job,name,image} = data;
    await db.insert(cast).values({
        name : name ,
        age : Number(age) ,
        job : job ,
        image : image
    }) 
    revalidatePath('/admin/staff')
    return {
     success :"Cast Created Successfuly!"
    }


}

export const updateStaff = async (id : string , _data : z.infer<typeof staffSchema>) => {
    const {data,error} = staffSchema.safeParse(_data) 
    if(error){
     return {error : error}
    }
    const {age,image,job,name} = data;
    await db.update(cast).set({
        name : name ,
        age : Number(age) ,
        job : job ,
        image : image
    }).where(eq(cast.id,id))
    revalidatePath('/admin/staff')
    return {
     success :"Staff Updated Successfuly!"
    }
}

export const deleteStaff = async (id : string) => {
    const exist = await db.query.cast.findFirst({
        where : (_cast , {eq}) => eq(_cast.id,id),
    });
    if(!exist){
        return {error : "Staff was Not Found!"}
    }
    await db.delete(cast).where(eq(cast.id,exist.id));
    revalidatePath('/admin/languages')
    return {
        success :"Staff Deleted Successfuly!"
       }
}