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
            clientId:"Ov23lijK0pq41wRBK4Hv",
            clientSecret:"aa1e2280aa4f267f6641099676cc685a03bcc13e",
        }
    } ,
    plugins :[
        admin({
            defaultRole :false
        })
    ]
});