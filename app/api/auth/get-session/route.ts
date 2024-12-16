import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res : NextResponse , req : NextRequest) {
    const session = await auth.api.getSession({
        headers : await headers()
    })
    if(!session){
        return NextResponse.json({
            error :"Not Authurized!"
        })
    }
    
    return NextResponse.json({
        session : session?.session ,
        user : {
            id : session?.user.id ,
            role : session?.user.role,
            banned : session?.user.banned
        }
    });
}