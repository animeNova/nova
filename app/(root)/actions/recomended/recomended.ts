"use server";
import { auth } from "@/app/lib/auth";
import { db } from "@/drizzle";
import { genre, show, showToGenre, userInteractions, userPreferences } from "@/drizzle/db/schema";
import { sql, eq, desc, inArray } from "drizzle-orm";
import { headers } from "next/headers";


export async function getEnhancedRecommendations() {
    const user = await auth.api.getSession({
        headers : await headers()
    })
    if(!user?.session){
      return null;
    }
    const userId = user?.user.id;
    const interactions = await db
    .select()
    .from(userInteractions)
    .where(eq(userInteractions.userId, userId!));

  if (interactions.length > 10) {
    // Query based on user interactions
    const showIds = interactions.map((interaction) => interaction.showId);

    const recommendedShows = await db
      .select({
        id : show.id,
        title :show.title,
        image:show.image,
        video :show.video ,
        airing : show.airing
      })
      .from(show)
      .where(inArray(show.id, showIds))
      .leftJoin(showToGenre, eq(show.id, showToGenre.showId))
      .leftJoin(genre, eq(showToGenre.genreId, genre.id));

    return recommendedShows;
  } else {
    // Fall back to user preferences
    const preferences = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId!));

    const preferredGenreIds = preferences.map((pref) => pref.genreId!);

    const recommendedShows = await db.query.show.findMany({
        columns :{
            id : true,
            title :true,
            image:true,
            video :true ,
            airing : true
        },
        with :{
            showGenres : {
                where : (_filed,{inArray}) => inArray(_filed.genreId,preferredGenreIds)
            }
        } ,
        limit : 10 
    })

    return recommendedShows;
  }
}
