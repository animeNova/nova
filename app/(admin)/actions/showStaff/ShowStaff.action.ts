"use server";

import { db } from "@/drizzle";
import { showToCast} from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";

export async function updateShowStaffs(showId: string, staffsId: string[]) {
  // Start a transaction to ensure atomicity
  await db.transaction(async (tx) => {
    // Step 1: Delete existing genre associations for the show
    await tx.delete(showToCast).where(eq(showToCast.showId , showId));

    // Step 2: Insert new genre associations
    const showCastEntries = staffsId.map((castId) => ({
      showId,
      castId
    }));

    if (showCastEntries.length > 0) {
      await tx.insert(showToCast).values(showCastEntries);
    }
  });
}
