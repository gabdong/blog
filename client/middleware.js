import { NextResponse } from "next/server";

export async function middleware(req) {
    if (
        (req.nextUrl.pathname.startsWith('/tag') || req.nextUrl.pathname.startsWith('/post'))
        // && (req.nextUrl.pathname.includes('private'))
    ) {
        const tokenCookie = req.cookies.get('refreshTokenIdx') || {};
        const refreshTokenIdx = tokenCookie?.value;

        if (refreshTokenIdx) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/apis/tokens/check-token`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    Cookie: req.headers.get('cookie')
                }
            }).then(async (res) => {
                const authCheck = await res.json();

                console.log(authCheck);
                if (authCheck) {
                    const accessToken = authCheck.newAccessToken;
                    user = { ...authCheck.user };
                    user.accessToken = accessToken;
                    user.isLogin = true;
                } else if (req.nextUrl.pathname.includes('private')) {
                    return NextResponse.redirect(new URL('/?tabItem=latestPostList', req.url));
                }
            });
        } else if (req.nextUrl.pathname.includes('private')) {
            return NextResponse.redirect(new URL('/?tabItem=latestPostList', req.url));
        }
    }
}

export const config = {
    matcher: ['/tag/:path*', '/post/:path*']
}