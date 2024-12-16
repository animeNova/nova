import { Heart, Home , Library, List } from "lucide-react";
import { PiPaperPlaneTilt } from "react-icons/pi";

export const SideBarLinks = [
    {
        label : "Home",
        href : '/',
        icon :<Home size={25} /> 
    } ,
    {
        label :"Catalog",
        href :"/catalog",
        icon : <List size={25} />
    } ,
    // {
    //     label : "News",
    //     href : '/news',
    //     icon : <PiPaperPlaneTilt size={25} />
    // } ,
    // {
    //     label : "Collections",
    //     href : "/collections",
    //     icon  :<Library size={25} />
    // }
]