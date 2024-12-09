import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
  
  import type { OurFileRouter } from "@/app/api/uploadthing/core";
  
  export const UploadButton = generateUploadButton<OurFileRouter>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
  export async function deleteVideoFromUploadThing(videoId : string) {
    // Hypothetical API call - replace this with the actual method from UploadThing if available
    const response = await fetch(`https://api.uploadthing.com/videos/${videoId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.UPLOADTHING_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      return { error: 'Failed to delete video' };
    }
  
    return await response.json();
  }
