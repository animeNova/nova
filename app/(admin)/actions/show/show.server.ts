"use server";

import { db } from "@/drizzle";
import { QueryPorps } from "../../types";
import { asc, count, desc, eq, like, sql } from "drizzle-orm";
import { show ,showToGenre,showToCast} from "@/drizzle/db/schema";
import { z } from "zod";
import { showSchema } from "../../types/zod.types";
import { revalidatePath } from "next/cache";
import { updateShowGenres } from "../showGenre/showGenre.action";
import { updateShowStaffs } from "../showStaff/ShowStaff.action";
import { generateEmbeddings } from "../../lib/embeddings";

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
   const {title,secondTilte,relativeTitle,creatorId,description,genreIds,image,languageId,rating,season,staffs,status,studioId,type,airing,trailer,video,videoKey,keyWord} = data
   const embedding = await generateEmbeddings(`${description} ${keyWord.join()}`)
  
   const [newShow] = await db.insert(show).values({
    title ,
    secondTilte : secondTilte,
    relativeTitle ,
    description ,
    embedding : embedding[0] ,
    image ,
    languageId ,
    rating : rating ,
    season ,
    status ,
    studioId ,
    type ,
    creatorId ,
    airing : airing.toLocaleDateString(),
    trailer ,
    video ,
    videoKey ,
    tags : keyWord
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
    castId: staffId.value
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
    // const result = await db.select({
    //     id : show.id ,
    //     title : show.title ,
    //     trailer : show.trailer,
    //     relativeTitle : show.relativeTitle ,
    //     rating : show.rating ,
    //     airing : show.airing ,
    //     description : show.description ,
    //     image : show.image ,
    //     backgroundImage : show.backgroundImage,
    //     images : show.images ,
    //     type : show.type ,
    //     season : show.season ,
    //     status : show.status ,
    //     languageId : show.languageId ,
    //     creatorId : show.creatorId ,
    //     studioId : show.studioId ,
    //     genreIds: sql`(
    //         SELECT array_agg(DISTINCT ${showToGenre.genreId})
    //         FROM show_to_genre
    //         WHERE show_to_genre.show_id = ${show.id}
    //       )`.as("genreIds") ,
    //     video : show.video ,
    //     videoKey : show.videoKey ,
    //     keyWord : show.tags
    // }).from(show).where(eq(show.id , id))
    // .leftJoin(showToGenre , eq(showToGenre.showId , show.id))
    // .innerJoin(showToCast, eq(show.id, showToCast.showId)) // Join show_cast
    // .innerJoin(cast, eq(showToCast.castId, cast.id))    
    // .groupBy(show.id, show.title)

    
    
    // if(!result){
    //     return {error : "show was Not Found!"}
    // }
    // const castResult = await db.execute(sql`
    //     SELECT "cast".id AS cast_id, "cast".name AS cast_name
    //     FROM "cast"
    //     JOIN "show_to_cast" ON "cast".id = "show_to_cast".cast_id
    //     WHERE "show_to_cast".show_id = ${id};
    // `);
    // return {
    //     ...result[0],
    //     staffs: castResult.rows.map((row) => ({
    //         value: row.cast_id,
    //         label: row.cast_name,
    //       })),
    // };
    const result = await db.query.show.findFirst({
        where : (_show , {eq}) => eq(_show.id,id),
       with : {
        showCasts : {
            with :{
                cast : true
            }
        },
        showGenres : {
            with :{
                genre:true
            }
        }
       }
    })
    if(!result){
        return {
            error : "Show is Not Found!"
        }
    }
    const formatedResult = {
        id : result.id ,
        title : result.title,
        secondTilte : result.secondTilte,
        relativeTitle : result.relativeTitle,
        image : result.image,
        keyWord : result.tags,
        description:result.description,
        status:result.status,
        season:result.season,
        trailer:result.trailer,
        type : result.type,
        rating:result.rating,
        languageId:result.languageId,
        creatorId:result.creatorId,
        studioId:result.studioId ,
        airing:result.airing,
        video:result.video,
        videoKey:result.videoKey,
        staffs : result.showCasts.map((cast) => ({
            label : cast.cast.name,
            value : cast.cast.id
        })),
        genreIds:result.showGenres.map((genre) => genre.genre.id),
    }


    return formatedResult;
    
}
export const updateshow = async (id : string , _data : z.infer<typeof showSchema>) => {
    const {data,error} = showSchema.safeParse(_data) 
    if(error){
     return {error : error}
    }
    const {title,secondTilte,relativeTitle,creatorId,description,genreIds,image,languageId,rating,season,staffs,status,studioId,type,airing,trailer,video,videoKey,keyWord} = data

    const embedding = await generateEmbeddings(`${description} ${keyWord.join()}`)


    const [newShow] = await db.update(show).set({
     title ,
     secondTilte ,
     relativeTitle ,
     description ,
     embedding : embedding[0] ,
     image ,
     languageId ,
     rating : Number(rating) ,
     season ,
     status ,
     studioId ,
     type ,
     creatorId ,
     airing : airing.toLocaleDateString(),
     trailer ,
     video ,
     videoKey ,
     tags : keyWord
    }).where(eq(show.id,id)).returning();
    if (!newShow) {
     return {
         error : "Failed to create show"
     }
   } 
   await updateShowGenres(newShow.id , genreIds)
   await updateShowStaffs(newShow.id , staffs.map((cast) => cast.value))
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

export async function getShowsCountsByMonth() {
    // Query to group users by month name and year, and count users
    const totalShowsResult  = await db.select({count: count() }).from(show);
    const totalShows = totalShowsResult[0].count;

    const showsData = await db
      .select({
        month: sql`TO_CHAR(${show.created_at}, 'Month')`.as("month") ,
        year: sql`EXTRACT(YEAR FROM ${show.created_at})`.as("year"),
        count: sql`COUNT(*)`.as("count"),
      })
      .from(show)
      .groupBy(sql`TO_CHAR(${show.created_at}, 'Month'), EXTRACT(YEAR FROM ${show.created_at})`)
      .orderBy(sql`EXTRACT(YEAR FROM ${show.created_at}), TO_CHAR(${show.created_at}, 'Month')`);
  
    return {
        totalShowsResult : totalShows ,
        ShowsData : showsData
    };
  }

