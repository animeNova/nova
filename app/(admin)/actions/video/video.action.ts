"use server"

import { db } from "@/drizzle"
import { show } from "@/drizzle/db/schema"
import { UTApi } from "uploadthing/server"
import { eq } from 'drizzle-orm';

const utapi = new UTApi()

export async function deleteVideo(fileKey: string) {
  try {
    await utapi.deleteFiles(fileKey)
    await db.update(show).set({
        video :"" ,
        videoKey :""
    }).where(eq(show.videoKey,fileKey))
    
    return { success: true, message: "Video deleted successfully" }
  } catch (error) {
    console.error("Error deleting video:", error)
    return { success: false, message: "Failed to delete video" }
  }
}