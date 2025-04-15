"use server";

import { QueryPorps } from "@/app/(admin)/types";
import { db } from "@/drizzle";
import { genre, show, showToGenre } from "@/drizzle/db/schema";
import { asc, cosineDistance, count, desc, eq, like, sql,gt, and,ne, or, ilike, inArray, gte, lte } from "drizzle-orm";


export const getShows = async (query: QueryPorps) => {
    const { limit = 12, orderBy = 'asc', page = 1, season, genres } = query;
    const offset = (page - 1) * limit;

    // Build the where conditions
    const whereConditions = [];
    
    if (season) {
        whereConditions.push(eq(show.season, season));
    }
    
    // Handle genre filtering with a more efficient approach
    let showsQuery;
    let countQuery;
    
    if (genres && genres.length > 0) {
        // Get show IDs that match all the requested genres
        const showIdsWithGenres = await db
            .select({ id: show.id })
            .from(show)
            .innerJoin(showToGenre, eq(show.id, showToGenre.showId))
            .where(inArray(showToGenre.genreId, genres))
            .groupBy(show.id);
            
        const matchingIds = showIdsWithGenres.map(item => item.id);
        
        if (matchingIds.length > 0) {
            whereConditions.push(inArray(show.id, matchingIds));
        } else {
            // No shows match the genres, return empty result
            return {
                totalShows: 0,
                currentpage: Number(page),
                hasNextPage: false,
                result: [],
                totalPages: 0,
            };
        }
    }
    
    // Build and execute the main query with all conditions
    showsQuery = db
        .select({
            id: show.id,
            title: show.title,
            airing: show.airing,
            image: show.image,
            video: show.video
        })
        .from(show);
        
    if (whereConditions.length > 0) {
        showsQuery = showsQuery.where(and(...whereConditions));
    }
    
    // Get total count for pagination
    countQuery = db.select({ count: count() }).from(show);
    if (whereConditions.length > 0) {
        countQuery = countQuery.where(and(...whereConditions));
    }
    
    // Execute both queries
    const [result, totalshowsResult] = await Promise.all([
        showsQuery
            .orderBy(orderBy === 'asc' ? asc(show.airing) : desc(show.airing))
            .offset(offset)
            .limit(limit),
        countQuery
    ]);
    
    const totalshows = totalshowsResult[0].count;
    const hasNextPage = page * limit < totalshows;
    
    return {
        totalShows: totalshows,
        currentpage: Number(page),
        hasNextPage,
        result,
        totalPages: Math.ceil(totalshows / limit),
    };
};

export const getShow = async (id : string) => {
    const result = await db.query.show.findFirst({
        where : (_show , {eq}) => eq(_show.id,id),
        columns : {
            id:true ,
            title:true,
            relativeTitle:true,
            airing:true,
            description:true,
            image:true,
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
    .where(and(gt(similarity, 0.45),ne(show.id,id)))
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
    const startOf2024 = '2024-1-1';
    const endOf2024 = '2024-12-31';
    const bestShows = await db
    .select()
    .from(show)
    .where(
      and(
        gte(show.airing, startOf2024),
        lte(show.airing, endOf2024)
      )
    )
    .orderBy(
      desc(show.rating),
      desc(show.airing)
    )
    return bestShows;
}

export const getSearch = async (text :string) => {
    const result = await db.select({
        id:show.id ,
        title :show.title ,
        image : show.image
    }).from(show).where(or(ilike(show.title,`%${text}%`),ilike(show.description,`%${text}%`)))
    return result
}

export const getPopular = async () => {
    const shows = await db.query.show.findMany({
        columns : {
            id : true,
            title :true,
            image:true,
            video:true,
            airing :true
        } ,
        orderBy : (_field,{desc}) => [desc(_field.rating)]
    })
    return shows;
}


