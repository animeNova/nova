import { z } from "zod";

export const prefrencesSchema = z.object({
    genres : z.array(z.string()).min(1, {
        message :"Prefrences is required"
    })
})