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
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}
