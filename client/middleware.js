import { NextResponse } from "next/server";
import { checkLogin } from "./lib/apis/tokens";

export async function middleware(req) {
    if (
        (req.nextUrl.pathname.startsWith('/tag') || req.nextUrl.pathname.startsWith('/post'))
        && (req.nextUrl.pathname.includes('private'))
    ) {
        const userData = await checkLogin(true, req.headers.get('cookie'), true) || {};

        return NextResponse.redirect(new URL('/?tabItem=latestPostList', req.url));
    }
}

export const config = {
    matcher: ['/tag/:path*', '/post/:path*']
}