import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Better-Auth stores the session token in a cookie named "better-auth.session_token"
  // By checking the cookie directly, we avoid importing the 'auth' library
  // into the middleware, which prevents the "Edge Runtime" crash.
  const sessionToken = request.cookies.get("better-auth.session_token");

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

  // 1. If trying to access admin and NOT logged in -> Redirect to Login
  if (isAdminPage && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. If logged in and trying to access Login/Register -> Redirect to Admin
  if (isAuthPage && sessionToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
