import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
export const {signIn,signOut,signUp,useSession,user} = createAuthClient({
    baseURL: "https://6760872e9b9c486680a8bb6a--tranquil-cupcake-4f32e9.netlify.app" ,// the base url of your auth server ,
    plugins :[
        adminClient()
    ]
})
