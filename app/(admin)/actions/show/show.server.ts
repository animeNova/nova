"use server";

import { db } from "@/drizzle";
import { QueryPorps } from "../../types";
import { asc, count, desc, eq, like, sql } from "drizzle-orm";
import { show ,showToGenre,showToCast, genre, cast} from "@/drizzle/db/schema";
import { z } from "zod";
import { showSchema } from "../../types/zod.types";
import { revalidatePath } from "next/cache";
import { updateShowGenres } from "../showGenre/showGenre.action";
import { updateShowStaffs } from "../showStaff/ShowStaff.action";
import ollama from "ollama";

export const getshows = async (query : QueryPorps) => {
    const {limit= 12,orderBy ='asc',page =1} = query;
    const offset = (page - 1) * limit;
    const totalshowsResult  = await db.select({count: count() }).from(show);
    const result = await db.select({
        id : show.id ,
        title : show.title ,
        secondTitle : show.relativeTitle ,
        rating : show.rating ,
        airing : show.airing ,
        description : show.description ,
        image : show.image ,
        status:show.status ,
        season:show.season,
        type : show.type
    }).from(show).orderBy(orderBy == 'asc' ? asc(show.created_at) : desc(show.created_at)).offset(offset).limit(limit)
    const totalshows = totalshowsResult[0].count;

    // Calculate if there's a next page
    const hasNextPage = page * limit < totalshows;
    return {
        totalShows : totalshows ,
        currentpage : Number(page) ,
        hasNextPage,
        result,
        totalPages: Math.ceil(totalshows / limit),
    }
}

export const createshow = async (_data : z.infer<typeof showSchema>) => {
   const {data,error} = showSchema.safeParse(_data) 
   if(error){
    return {error : error}
   }
   const {title,relativeTitle,creatorId,description,genreIds,image,languageId,rating,season,staffs,status,studioId,type,airing} = data
   const embedding = await ollama.embeddings({
    model:"snowflake-arctic-embed" ,
    prompt:description
  })
   const [newShow] = await db.insert(show).values({
    title ,
    relativeTitle ,
    description ,
    embedding : embedding.embedding ,
    image ,
    languageId ,
    rating : Number(rating) ,
    season ,
    status ,
    studioId ,
    type ,
    creatorId ,
    airing : airing.toLocaleDateString()
   }).returning();
   if (!newShow) {
    return {
        error : "Failed to create show"
    }
  } 
  const showGenreEntries = genreIds.map((genreId) => ({
    showId: newShow.id,
    genreId,
  }));
  const showStaffEntries = staffs.map((staffId) => ({
    showId: newShow.id,
    castId: staffId
  }));
  await db.insert(showToGenre).values(showGenreEntries);
  await db.insert(showToCast).values(showStaffEntries)
   revalidatePath('/admin/shows')
   return {
    success :"shows Created Successfuly!"
   }

}

export const searchShow = async (title : string) => {
    const result = await db.select({
        id:show.id ,
        title : show.title
    }).from(show).where(like(show.title , `%${title}%`))
    return result;
}

export const getshow = async (id : string) => {
    const result = await db.select({
        id : show.id ,
        title : show.title ,
        relativeTitle : show.relativeTitle ,
        rating : show.rating ,
        airing : show.airing ,
        description : show.description ,
        image : show.image ,
        type : show.type ,
        season : show.season ,
        status : show.status ,
        languageId : show.languageId ,
        creatorId : show.creatorId ,
        studioId : show.studioId ,
        genreIds: sql`array_agg(${showToGenre.genreId})`.as("genreIds"),
        staffs: sql`(
            SELECT array_agg(DISTINCT ${showToCast.castId})
            FROM show_to_cast
            WHERE show_to_cast.show_id = ${show.id}
          )`.as("castIds"), 

    }).from(show).where(eq(show.id , id))
    .leftJoin(showToGenre , eq(showToGenre.showId , show.id))
    .leftJoin(showToCast , eq(showToCast.showId , show.id))
    .groupBy(show.id, show.title)

    
    
    if(!result){
        return {error : "show was Not Found!"}
    }
    return result[0];
}
export const updateshow = async (id : string , _data : z.infer<typeof showSchema>) => {
    const {data,error} = showSchema.safeParse(_data) 
    if(error){
     return {error : error}
    }
    const {title,relativeTitle,creatorId,description,genreIds,image,languageId,rating,season,staffs,status,studioId,type,airing} = data
    const embedding = await ollama.embeddings({
        model:"snowflake-arctic-embed" ,
        prompt:description
      })

    const [newShow] = await db.update(show).set({
     title ,
     relativeTitle ,
     description ,
     embedding : embedding.embedding ,
     image ,
     languageId ,
     rating : Number(rating) ,
     season ,
     status ,
     studioId ,
     type ,
     creatorId ,
     airing : airing.toLocaleDateString()
    }).where(eq(show.id,id)).returning();
    if (!newShow) {
     return {
         error : "Failed to create show"
     }
   } 
   await updateShowGenres(newShow.id , genreIds)
   await updateShowStaffs(newShow.id , staffs)
    revalidatePath('/admin/shows')
    return {
     success :"show Created Successfuly!"
    }
}
export const deleteshow = async (id : string) => {
    const exist = await db.query.show.findFirst({
        where : (_show , {eq}) => eq(_show.id,id),
    });
    if(!exist){
        return {error : "show was Not Found!"}
    }
    await db.delete(show).where(eq(show.id,exist.id));
    revalidatePath('/admin/shows')
    return {
        success :"show Deleted Successfuly!"
       }
}