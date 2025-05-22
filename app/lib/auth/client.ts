import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
export const {signIn,signOut,signUp,useSession,user,admin} = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_URL ,// the base url of your auth server ,
    plugins :[
        adminClient() ,  
    ]
})
