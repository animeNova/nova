"use server";

import { db } from "@/drizzle";


export const getHeroRecommendation = async () => {
    const data = await db.query.show.findMany({
        columns : {
            id : true,
            trailer : true,
            title:true,
            description : true,
            image : true,
            video : true
        } , 
        orderBy : (show,{desc}) => [desc(show.airing)] ,
        limit : 5
    })
    return data;
}