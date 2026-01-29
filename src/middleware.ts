import { NextResponse, type NextRequest } from "next/server";
// Import the auth instance you created earlier
import { auth } from "../lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

  // 1. If trying to access admin and NOT logged in -> Redirect to Login
  if (isAdminPage && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. If logged in and trying to access Login/Register -> Redirect to Admin
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
