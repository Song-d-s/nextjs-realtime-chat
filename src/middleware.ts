import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    // Get current path that user is on
    const pathname = req.nextUrl.pathname;
    // Manage route protection
    const isAuth = await getToken({ req });
    const isLoginPage = pathname.startsWith("/login");

    const sensitiveRoutes = ["/dashboard"];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  // Match which router where the middleware actually runs
  matcher: ["/", "/login", "/dashboard/:path*"],
};

/* 이 코드는 Next.js 애플리케이션에서 인증 미들웨어를 구현하고, 미들웨어가 적용되는 경로를 설정하는 역할을 합니다.

withAuth 함수는 Next.js에서 제공하는 미들웨어 함수 중 하나입니다. withAuth 함수는 인증이 필요한 경로에서 실행되며, callbacks.authorized() 함수를 호출하여 사용자가 인증되었는지 여부를 결정합니다. 이 함수가 true를 반환하면 경로에 대한 액세스가 허용되고, false를 반환하면 액세스가 거부됩니다.

middleware 함수는 withAuth 함수에 전달되는 두 번째 인수로 사용됩니다. 이 함수는 요청(request) 객체를 입력값으로 받으며, 현재 요청 경로에 대한 인증 상태를 확인하고, 알맞은 응답(response)을 반환합니다.

getToken 함수는 JWT(JSON Web Token)를 가져오는 함수입니다. req 객체를 인자로 받아, JWT 토큰이 있는 경우 해당 토큰을 반환하고, 없는 경우 null을 반환합니다.

NextResponse는 Next.js에서 제공하는 응답 객체입니다. NextResponse.next()는 다음 미들웨어 함수를 실행하고, NextResponse.redirect()는 다른 경로로 리다이렉션합니다.

pathname 변수는 현재 요청 경로를 저장하고, isLoginPage 변수는 현재 경로가 로그인 페이지인지 여부를 저장합니다. sensitiveRoutes 변수는 보호되어야 하는 경로를 저장하고, isAccessingSensitiveRoute 변수는 현재 경로가 보호되어야 하는 경로인지 여부를 저장합니다.

위 코드에서는 isLoginPage가 true인 경우, 사용자가 이미 인증되었는지 확인하고 인증되어 있다면 /dashboard 경로로 리다이렉션합니다. 그렇지 않은 경우 NextResponse.next()를 반환하여 다음 미들웨어 함수를 실행합니다.

isAccessingSensitiveRoute가 true이고 isAuth가 false인 경우, /login 경로로 리다이렉션합니다. pathname이 /인 경우, /dashboard 경로로 리다이렉션합니다.

마지막으로 config 객체는 matcher 속성을 갖고 있으며, 미들웨어가 실행될 경로를 정의합니다. 위 코드에서는 /, /login, /dashboard/:path* 경로에 미들웨어가 적용됩니다. :path*는 변수 경로를 나타내며, /dashboard 경로 이후의 모든 경로를 대체할 수 있습니다. */
