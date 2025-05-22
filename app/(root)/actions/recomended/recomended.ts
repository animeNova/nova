"use server";

import { auth } from "@/app/lib/auth";
import { db } from "@/drizzle";
import { genre, show, showToGenre, userInteractions, userPreferences } from "@/drizzle/db/schema";
import { eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";

// Define return type for better type safety
type RecommendedShow = {
  id: string; // Changed from number to string since it's a UUID in the schema
  title: string;
  image: string | null;
  video: string | null;
  airing: Date | string; // Changed from boolean to Date or string since it's a date in the schema
};

/**
 * Get personalized show recommendations based on user interactions or preferences
 * @returns Array of recommended shows or null if user is not authenticated
 */
export async function getEnhancedRecommendations(): Promise<RecommendedShow[] | null> {
  try {
    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Return null if user is not authenticated
    if (!session?.session) {
      return null;
    }

    const userId = session.user.id;
    
    // Get user interactions
    const interactions = await db
      .select()
      .from(userInteractions)
      .where(eq(userInteractions.userId, userId));

    // Define common show fields to select
    const showFields = {
      id: show.id,
      title: show.title,
      image: show.image,
      video: show.video,
      airing: show.airing,
    };

    // If user has sufficient interaction history, recommend based on that
    if (interactions.length > 10) {
      const showIds = interactions.map((interaction) => interaction.showId);

      return await db
        .select(showFields)
        .from(show)
        .where(inArray(show.id, showIds))
        .limit(10);
    } 
    
    // Otherwise, fall back to user preferences
    const preferences = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId));

    // If user has no preferences, return empty array
    if (preferences.length === 0) {
      return [];
    }

    const preferredGenreIds = preferences.map((pref) => pref.genreId!).filter(Boolean);
    
    // If no valid genre IDs, return empty array
    if (preferredGenreIds.length === 0) {
      return [];
    }

    return await db.query.show.findMany({
      columns: {
        id: true,
        title: true,
        image: true,
        video: true,
        airing: true
      },
      with: {
        showGenres: {
          where: (field, { inArray }) => inArray(field.genreId, preferredGenreIds),
        },
      },
      where: (fields, { exists, and }) => 
        exists(
          db.select({ id: showToGenre.showId })
            .from(showToGenre)
            .where(and(
              eq(showToGenre.showId, fields.id),
              inArray(showToGenre.genreId, preferredGenreIds)
            ))
        ),
      limit: 10,
    });
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return [];
  }
}
