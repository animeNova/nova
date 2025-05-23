export interface QueryPorps {
    page ?:number;
    limit ?:number;
    orderBy ?:'asc' |'desc'; 
    season ?: string;
    genres ?: string[]
    type ?: 'TV' | 'MOVIE' | ''
}