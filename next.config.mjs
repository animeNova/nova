import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
 
    images :{
        remotePatterns : [
            {
                hostname :"m.media-amazon.com"
            },
            {
                hostname : "res.cloudinary.com"
            } ,
            {
                hostname : "lh3.googleusercontent.com"
            },
            {
                hostname : "utfs.io"
            }
        ]
    } ,
    typescript: {
        // This will allow builds to complete even if there are TypeScript errors
        ignoreBuildErrors: true,
    },
    serverExternalPackages : ["@simplewebauthn/server"]
};

export default withNextVideo(nextConfig);