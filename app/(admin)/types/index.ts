import { Genre } from "@/store/useGenreStore";

export interface QueryPorps {
    page ?:number;
    limit ?:number;
    orderBy ?:'asc' |'desc'; 
    season?:string;
    genres ?: Genre[]
}