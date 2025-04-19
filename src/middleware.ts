import { NextRequest , NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// import { default } from "next-auth/middleware"

export const config = {
    matcher: ['/verify/:path*' , '/verify'],

};

export async function middleware(request: NextRequest) {
    console.log("middleware started")
    const token = await getToken({ req: request});
    const url = request.nextUrl;

    if(
        token && 
        (url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/verify') ||
        url.pathname === '/')
    ) {
        console.log("user loged in and token :" , token)
        // return NextResponse.redirect(new URL('/verify/dashboard' , request.url));
    }

    if (!token && url.pathname.startsWith('/verify/dashboard')) {
        console.log(" token :" , token)
        console.log("user loged out" , token)
        return NextResponse.redirect(new URL('/sign-in' , request.url))
    }

    return NextResponse.next()
} 