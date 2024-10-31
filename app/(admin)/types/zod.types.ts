import { z } from "zod";


export const genreSchema = z.object({
    title : z.string().min(2).max(55)
})
export const languageSchema = z.object({
    title : z.string().min(2).max(55)
})
export const staffSchema = z.object({
    name : z.string().min(2).max(55) ,
    age : z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
      }),
    job : z.string().min(2).max(55),
    image : z.string().min(2).optional(),
})
export const creatorSchema = z.object({
    name : z.string().min(2).max(55) ,
    age : z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
      }),
    image : z.string().min(2).optional(),
})
export const StudioSchema = z.object({
    name : z.string().min(2).max(55) ,
    image : z.string().min(2).optional(),
})

export const showSchema = z.object({
    title : z.string().min(2,{
        message : "title is required"
    }).max(255),
    relativeTitle : z.string().min(2,{
        message : "relativeTitle is required"
    }).max(255),
    description :  z.string().min(2,{
        message : "description is required"
    }).max(500) ,
    status :z.string().min(1,{
        message : "status is required"
    }) ,
    season : z.string().min(1,{
        message : "season is required"
    }),
    type : z.enum(["TV","MOVIE"], {
        message :"type is Required"
    }) ,
    rating : z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
      }),
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
    staffs : z.array(z.string(),{
        message:"casts are required"
    }).min(1)   ,
    airing : z.date({
        message:"year are required"
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
    })
})