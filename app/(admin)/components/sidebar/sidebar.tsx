'use client';
import { Calendar, Home, Inbox, Search, Settings,User,Languages,Tags,SquareUser,PersonStanding ,Star,Clapperboard,Library,SquareScissors,Pen, ChartNoAxesCombined} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Statics",
    url: "/admin",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: User,
  },
  {
    title: "Genre",
    url: "/admin/genres",
    icon: Tags,
  },
  {
    title: "Language",
    url: "/admin/languages",
    icon: Languages,
  },
  {
    title: "Staff",
    url: "/admin/staff",
    icon: SquareUser,
  },
  {
    title: "Studio",
    url: "/admin/studio",
    icon: SquareScissors,
  },
  {
    title: "Creator",
    url: "/admin/creators",
    icon: Pen,
  },
  {
    title: "Shows",
    url: "/admin/shows",
    icon: Clapperboard,
  }
]

export function AppSidebar() {
  const path = usePathname()
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
               const isActive = path.endsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={cn(isActive ? 'bg-secondary rounded-md' : '')}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
          
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}
