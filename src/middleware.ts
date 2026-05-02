import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  const { pathname } = req.nextUrl;
  
  // Define protected routes
  const isProtectedRoute = pathname.startsWith("/dashboard") || 
                          pathname.startsWith("/tasks") || 
                          pathname.startsWith("/projects") || 
                          pathname.startsWith("/team") || 
                          pathname.startsWith("/progress");
                          
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Admin only route
  if (pathname.startsWith("/dashboard") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/tasks", req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tasks/:path*",
    "/projects/:path*",
    "/team/:path*",
    "/progress/:path*",
    "/dashboard",
    "/tasks",
    "/projects",
    "/team",
    "/progress"
  ],
};
