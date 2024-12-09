"use server";

import { db } from "@/drizzle";
import { genre } from "@/drizzle/db/schema";

export const getGenres = async () => {
    const result = await db.select({
        id : genre.id ,
        title : genre.title
    }).from(genre)
   return result
}