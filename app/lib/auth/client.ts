import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
export const {signIn,signOut,signUp,useSession,user} = createAuthClient({
    baseURL: "https://nova-git-development-tgrdg.vercel.app" ,// the base url of your auth server ,
    plugins :[
        adminClient()
    ]
})
