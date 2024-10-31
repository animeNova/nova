"use server";

import { db } from "@/drizzle";
import { showToGenre} from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";

export async function updateShowGenres(showId: string, genreIds: string[]) {
  // Start a transaction to ensure atomicity
  await db.transaction(async (tx) => {
    // Step 1: Delete existing genre associations for the show
    await tx.delete(showToGenre).where(eq(showToGenre.showId , showId));

    // Step 2: Insert new genre associations
    const showGenreEntries = genreIds.map((genreId) => ({
      showId,
      genreId,
    }));

    if (showGenreEntries.length > 0) {
      await tx.insert(showToGenre).values(showGenreEntries);
    }
  });
}
