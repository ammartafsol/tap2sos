import { NextResponse } from "next/server";
import {
  ADMIN_AFTER_LOGIN_ROUTES,
  WITHOUT_LOGIN_ROUTES,
} from "./developmentContent/routes";
import { handleDecrypt } from "./resources/utils/helper";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const role = handleDecrypt(request?.cookies.get("_xpdx_ur")?.value);
  const accessToken = handleDecrypt(request?.cookies.get("_xpdx")?.value);

  console.log("middleware check", { pathname, role, accessToken });

  // If user is accessing auth pages but already logged in -> redirect to dashboard
  if (accessToken && WITHOUT_LOGIN_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Special handling for root '/'
  if (pathname === "/") {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    // If token exists, allow access to '/'
    return NextResponse.next();
  }

  // Normal protected route handling
  const isProtectedRoute = ADMIN_AFTER_LOGIN_ROUTES.some((protectedRoute) => {
    return protectedRoute === pathname || pathname.startsWith(protectedRoute + "/");
  });

  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|Images|fonts).*)"],
};
