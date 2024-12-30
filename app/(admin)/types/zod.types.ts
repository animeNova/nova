import { z } from "zod";


export const genreSchema = z.object({
    title : z.string().min(2).max(55)
})
export const languageSchema = z.object({
    title : z.string().min(2).max(55)
})
export const staffSchema = z.object({
    name : z.string().min(2).max(55) ,
    birth :z.string().optional(),
    job : z.string().min(2).max(55),
    image : z.string().optional(),
})
export const creatorSchema = z.object({
    name : z.string().min(2).max(55) ,
    birth :z.string().optional(),
    image : z.string().optional(),
})
export const StudioSchema = z.object({
    name : z.string().min(2).max(55) ,
    image : z.string().min(2).optional(),
})

export const showSchema = z.object({
    title : z.string().min(2,{
        message : "title is required"
    }).max(255),
    secondTilte : z.string(),
    relativeTitle : z.string().min(2,{
        message : "relativeTitle is required"
    }).max(255),
    description :  z.string().min(2,{
        message : "description is required"
    }) ,
    status :z.string().min(1,{
        message : "status is required"
    }) ,
    season : z.string().min(1,{
        message : "season is required"
    }),
    type : z.enum(["TV","MOVIE"], {
        message :"type is Required"
    }) ,
    rating : z.preprocess(
        Number,
        z.number()
      ),
    image : z.string().min(1,{
        message : "image is required"

    }),
    languageId : z.string().min(1,{
        message :"language is required"
    }) ,
    creatorId : z.string().min(1,{
        message : "creatorId is required"

    }), 
    studioId : z.string().min(1,{
        message : "studioId is required"

    }) ,
    genreIds : z.array(z.string(),{
        message:"genres are required"
    }).min(1),
    staffs : z.array(z.object({
        label : z.string() ,
        value : z.string()
    }),{
        message:"casts are required"
    }).min(1)   ,
    airing :z.date({
        message :"airing is required!"
    }),
    trailer :z.string().nullable().transform((val) => val || ''),
    video : z.string({
        message :"Video is Required!"
    }),
    videoKey : z.string({
        message :"videoKey is required!"
    }) ,
    keyWord : z.array(z.string()).min(1 , {
        message : "key Word are Required"
    })
})

export const characterSchema = z.object({
    name : z.string().min(1, {
        message :"Name is Required"
    }),
    image : z.string().min(1, {
        message :"Image is Required"

    }) ,
    showId : z.string().min(1,{
        message :"ShowId is Required"
    }),
    cast : z.object({
        value : z.string(),
        label : z.string()
    }, {
        message : "Cast is Required!"
    })
})