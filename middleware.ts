import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";
import {UserMilldreware,UserPrefrences} from '@/lib/utils'
import {adminRoutes,privateRoutes,prefenceRoute} from '@/constant/router'
export default async function authMiddleware(request: NextRequest) {
    const {nextUrl} = request;
	const { data: session } = await betterFetch<UserMilldreware>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				//get the cookie from the request
				cookie: request.headers.get("cookie") || "",
			},
		},
	);
    const isAuthRoutes = privateRoutes.includes(nextUrl.pathname)
    const isAdminRoutes= adminRoutes.includes(nextUrl.pathname)
	if (isAuthRoutes) {
        if(!session?.session){
            return NextResponse.redirect(new URL("/", request.url));
        }
	}
    if(isAdminRoutes) {
        if(!session?.session){
            return NextResponse.redirect(new URL("/", request.url));
        }
        if(session?.user && session?.user.role !== 'admin'){
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }
	return NextResponse.next();
}
 
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
      ],
};