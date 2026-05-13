import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/projects", "/tasks", "/settings", "/profile"];
const accessCookie = "taskflow_access";
const legacyCookie = "token";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get(accessCookie)?.value ?? req.cookies.get(legacyCookie)?.value;
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/tasks/:path*", "/settings/:path*", "/profile/:path*"],
};
