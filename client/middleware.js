import { NextResponse } from "next/server";

export async function middleware(req) {
  //* 비로그인시 private 페이지 접근 차단
  if (req.nextUrl.pathname.includes("private")) {
    const tokenCookie = req.cookies.get("refreshTokenIdx") || {};
    const refreshTokenIdx = tokenCookie?.value;

    let user;
    //* 쿠키에 refreshTokenIdx 있을경우 검증
    if (refreshTokenIdx) {
      const authCheckRes = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/apis/tokens/check-token`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Cookie: req.headers.get("cookie"),
          },
        }
      );
      const authCheck = await authCheckRes.json();

      if (authCheck) {
        const accessToken = authCheck.newAccessToken;
        user = { ...authCheck.user };
        user.accessToken = accessToken;
        user.isLogin = true;
      }
    }

    if (!user) {
      return NextResponse.redirect(
        new URL("/?tabItem=latestPostList", req.url)
      );
    }
  }
}

export const config = {
  matcher: ["/tag/:path*", "/post/:path*"],
};
