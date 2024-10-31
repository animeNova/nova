import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
export const {signIn,signOut,signUp,useSession,user} = createAuthClient({
    baseURL: "http://localhost:3000" ,// the base url of your auth server ,
    plugins :[
        adminClient()
    ]
})
