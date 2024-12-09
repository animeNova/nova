import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import {auth} from '@/app/lib/auth'

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "1MB" } , video : {maxFileSize : '32MB'} })
    // Set permissions and file types for this FileRoute
    .middleware(async ({req}) => {
      // This code runs on your server before upload
      const user = await auth.api.getSession({
        headers : req.headers
      })
      // If you throw, the user will not be able to upload
      if (user?.user.role !== 'admin') throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId , url : file.url,key : file.key};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
