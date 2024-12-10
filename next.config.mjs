import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = { ...config.resolve.fallback, fs: false }; // Avoids issues with Node modules
        return config;
      },
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
};

export default withNextVideo(nextConfig);