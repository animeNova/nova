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
            }
        ]
    } 
};

export default withNextVideo(nextConfig);