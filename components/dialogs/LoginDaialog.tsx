import { signIn } from "@/app/lib/auth/client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaGoogle,FaDiscord,FaGithub } from "react-icons/fa";


export function LoginDialog() {
  const siginIn = async (provider : "github" | "apple" | "discord" | "facebook" | "google" | "microsoft" | "spotify" | "twitch" | "twitter") => {
    await signIn.social({
      provider :provider,
      callbackURL : '/',
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button
                variant="default"
                className="text-sm font-semibold text-white/90"
              >
            
              Login
              </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[390px] sm:max-w-[425px] space-y-4 rounded-md border-2 ">
        <DialogHeader >
          <DialogTitle className="text-center text-3xl">Join Kurosaw</DialogTitle>
        </DialogHeader>
        <div className="flex items-center flex-col gap-3">
            <Button onClick={() => siginIn('google')} className="dark:bg-white dark:text-black/90 w-[280px]  font-semibold text-lg gap-2 flex items-center p-6">
            <FaGoogle size={30} />
            <h2>Continue with Google</h2>
            </Button>
            {/* <Button onClick={() => siginIn('discord')} className="dark:bg-white dark:text-black/90 w-[280px]  font-semibold text-lg gap-2 flex items-center p-6">
            <FaDiscord size={30} />
            <h2>Continue with Discord</h2>
            </Button> */}
            <Button onClick={() => siginIn('github')} className="dark:bg-white dark:text-black/90 w-[280px]  font-semibold text-lg gap-2 flex items-center p-6">
            <FaGithub size={30} />
            <h2>Continue with Github</h2>
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
