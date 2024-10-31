import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SideBarLinks } from "@/constant/sidebarLinks"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
export function Sidebar() {
  const path = usePathname()

  return (
    <Sheet >
      <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="lg:hidden">
              <span className="sr-only">Open menu</span>
              <Menu size={25} aria-hidden="true" />
              
            </Button>
      </SheetTrigger>
      <SheetContent side={"left"}  className="space-y-4">
        <SheetHeader>
        <div className="flex-shrink-0 p-2">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
              </svg>
            </div>
        </SheetHeader>

        <div className="flex flex-col justify-start items-center gap-7">
        {SideBarLinks.map((link,index) => {
        const isActive = path.endsWith(link.href);
        return (
             <Link href={link.href} key={index} className={cn("w-full hover:bg-primary hover:text-white p-2 rounded-md transition" , isActive && 'bg-primary text-white')}>
          <div className="flex justify-start items-center gap-2" >
              {link.icon} 
              <h2>{link.label}</h2>
          </div>
          </Link>
        )})}
        </div>
      </SheetContent>
    </Sheet>
  )
}
