import { auth } from "@/app/lib/auth";
import { db } from "@/drizzle";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await auth.api.getSession({
        headers : headers()
    });
    if(!user){
        return NextResponse.json("unauthorized!")
    }
    const prefrences = await db.query.userPreferences.findMany({
        where : (_field,{eq}) => eq(_field.userId,user.user.id)
    })
    return NextResponse.json(prefrences)

}