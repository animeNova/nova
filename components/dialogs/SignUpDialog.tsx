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
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email : z.string().email(),
  password : z.string().min(8, {
    message: "Password must be at least 8 characters.",
  })
})

export function SignUpDialog() {
  const {isOpen,closeSignUp} = useSignUpDialog()
  const {openLogin} = useLoginStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email:"",
      password:""
    },
  })

 const onSubmit=async (values: z.infer<typeof formSchema>) => {
  try {
   const {error} = await signUp.email({
      email : values.email ,
      name : values.username ,
      password : values.password
     })
     if(error){
      return toast.error(error.message)
     }
     toast.success("User Creatde Succfully!")
     form.reset()
     closeSignUp()
  } catch (error) {
      console.log(error);
  }
 

  }
  return (
    <Dialog open={isOpen} onOpenChange={closeSignUp}>
      <DialogContent className="max-w-[390px] sm:max-w-[425px] space-y-4 rounded-md border-2 border-primary">
        <DialogHeader >
          <DialogTitle className="text-center text-3xl">Join Kurosaw</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
            <div>
              <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button type="submit" className="p-4">Sign Up</Button>

              </div>
            </form>
          </Form>
            </div>
  
        </div>
           <DialogFooter>
                  <div>
                  <span>
                    you have an account ?  
                    <span className="text-primary font-bold pl-2"
                    onClick={() => {
                      closeSignUp()
                      openLogin()
                    }}
                    >
                       LogIn
                      </span> 
                  </span>
                  </div>
                  
                </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
