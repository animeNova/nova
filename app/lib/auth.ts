import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {db} from '../../drizzle/index'
import * as schema from '@/drizzle/db/schema'
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
            provider: "pg", // or "mysql", "sqlite"          
    }),
    socialProviders :{
        github :{
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret:process.env.GITHUB_CLIENT_SECRET!,
        },
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    } ,
    plugins :[
        admin({
            defaultRole :false
        }) ,
    ] ,
    trustedOrigins: [
        process.env.NEXT_PUBLIC_URL!
    ],
    advanced :{
        useSecureCookies :false
    } ,
    emailAndPassword: { 
        enabled: true, 
      }, 
});