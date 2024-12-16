import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import {UserMilldreware} from '@/lib/utils'
import {adminRoutes,privateRoutes} from '@/constant/router'
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
    matcher: ['/user/prefrences','/admin(.*)'],
};