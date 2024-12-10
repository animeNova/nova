"use server";

import { QueryPorps } from "@/app/(admin)/types";
import { db } from "@/drizzle";
import { show } from "@/drizzle/db/schema";
import { asc, cosineDistance, count, desc, eq, like, sql,gt, and,ne } from "drizzle-orm";


export const getShows = async (query : QueryPorps) => {
    const {limit= 12,orderBy ='asc',page =1} = query;
 
    const offset = (page - 1) * limit;
    const totalshowsResult  = await db.select({count: count() }).from(show);
    const result = await db.select({
        id : show.id ,
        title : show.title ,
        airing : show.airing ,
        image : show.image ,
        video : show.video
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

export const getShow = async (id : string) => {
    const result = await db.query.show.findFirst({
        where : (_show , {eq}) => eq(_show.id,id),
        columns : {
            id:true ,
            title:true,
            relativeTitle:true,
            airing:true,
            backgroundImage:true,
            description:true,
            image:true,
            images:true,
            rating:true,
            season:true,
            status:true,
            trailer:true,
            type:true,
            video:true
        },
        with : {
            lang : true,
            creator :true,
            studio:true,
            showCasts : {
                columns :{
                    castId:false,
                    showId:false
                },
                with :{
                
                    cast:{
                        columns : {
                            id:true,
                            image:true,
                            name:true,
                            birth:true,
                            job:true
                        }
                    }
                }
            },
            showGenres: {
                columns :{
                    genreId:false,
                    showId:false
                },
                with :{
                    genre:{
                        columns :{
                            id:true,
                            title:true
                        }
                    }
                }
            },
            charachter :{
                columns :{
                    id:true,
                    image:true,
                    name:true
                } ,
                with :{
                    castId :{
                        columns :{
                            image:true
                        }
                    }
                }
            }
        }
    })
    return result
}

export const getRecommendation =async (id:string) => {
    const showEm = await db.query.show.findFirst({
        where : (_show , {eq}) => eq(_show.id,id),
        columns :{
            id : true,
            embedding :true
        }
    })
    const similarity = sql<number>`1 - (${cosineDistance(show.embedding, showEm?.embedding!)})`;
    const similarShows = await db
    .select({ 
        id:show.id,
        title: show.title,
        airing:show.airing,
        image:show.image ,
        video : show.video ,
        similarity })
    .from(show)
    .where(and(gt(similarity, 0.5),ne(show.id,id)))
    .orderBy((t) => desc(t.similarity))
    .limit(10);
    return similarShows;
}

export const getRelations =async (id:string) => {
    const showR = await db.query.show.findFirst({
        where : (_show , {eq}) => eq(_show.id,id),
        columns :{
            id : true,
            relativeTitle :true
        }
    })

    const relation = await db.query.show.findMany({
        where : (_show , {eq,and,ne}) => and(ne(_show.id,id),eq(_show.relativeTitle,showR?.relativeTitle!)) ,
        columns :{
            id : true,
            title :true,
            image:true,
            video:true,
            airing :true
        }
    })

    return relation;
}

export const getBestOfYear = async () => {
    const shows = await db.query.show.findMany({
        columns : {
            id : true,
            title :true,
            image:true,
            video:true,
            airing :true
        } ,
        orderBy : (_field,{desc}) => [desc(_field.airing) , desc(_field.rating)]
    })
    return shows;
}