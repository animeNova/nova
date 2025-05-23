import { signIn, signUp } from "@/app/lib/auth/client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@radix-ui/react-separator";
import { FaGoogle,FaDiscord,FaGithub } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useLoginStore from "@/store/useLoginDialog";
import toast from "react-hot-toast";
import useSignUpDialog from "@/store/useSignUpDialog";

const formSchema = z.object({
  email : z.string().email(),
  password : z.string().min(8, {
    message: "Password must be at least 8 characters.",
  })
})

export function LoginDialog() {
  const {isOpen,closeLogin} = useLoginStore()
  const {openSignUp} = useSignUpDialog()
  const _siginIn = async (provider : "github" | "apple" | "discord" | "facebook" | "google" | "microsoft" | "spotify" | "twitch" | "twitter") => {
    await signIn.social({
      provider :provider,
      callbackURL : '/',
    })
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      password:""
    },
  })

 const onSubmit=async (values: z.infer<typeof formSchema>) => {
  try {
   const {error} = await signIn.email({
      email : values.email,
      password : values.password
    })
    if(error){
     return toast.error(error.message)
    }
     toast.success("User LogedIn Succfully!")
     form.reset()
     closeLogin()
  } catch (error) {
      console.log(error);  
  }
 

  }
  return (
    <Dialog open={isOpen} onOpenChange={closeLogin}>
      <DialogContent className="max-w-[390px] sm:max-w-[425px] space-y-4 rounded-md border-2 border-primary">
        <DialogHeader >
          <DialogTitle className="text-center text-3xl">Login Into Kurosaw</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
            <div>
              <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
              <Button type="submit" className="p-4">Login</Button>

              </div>
            </form>
          </Form>
            </div>

            <div className="flex items-center gap-2 justify-center text-white/80">
            <Separator className="bg-primary/80 w-24 h-1" />
            OR
            <Separator className="bg-primary/80 w-24 h-1" />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
            <Button onClick={() => _siginIn('google')} className="dark:bg-white dark:text-black/90 w-[280px]  font-semibold text-lg gap-2 flex items-center p-6">
            <FaGoogle size={30} />
            <h2>Continue with Google</h2>
            </Button>
  
            {/* <Button onClick={() => siginIn('github')} className="dark:bg-white dark:text-black/90 w-[280px]  font-semibold text-lg gap-2 flex items-center p-6">
            <FaGithub size={30} />
            <h2>Continue with Github</h2>
            </Button> */}
            </div>
  
        </div>
        <DialogFooter>
          <div>
          <span>
            dont have an account ? 
            <span className="text-primary font-bold pl-2"
            onClick={() => {
              openSignUp()
              closeLogin()
            }}
            >
              signUp
              </span> 
          </span>
          </div>
          
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
  )
}
