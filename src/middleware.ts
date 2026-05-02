import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  const { pathname } = req.nextUrl;

  // Protect all routes in the matcher
  if (!token) {
    // Determine the redirect URL dynamically to avoid localhost loops
    const host = req.headers.get("host") || "trac-stac.vercel.app";
    const protocol = host.includes("localhost") ? "http" : "https";
    const url = new URL("/login", `${protocol}://${host}`);
    
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Admin only route - cast token to any to avoid TS errors in middleware
  const userToken = token as any;
  if (pathname.startsWith("/dashboard") && userToken?.role !== "ADMIN") {
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
    "/progress",
    "/profile",
    "/settings",
    "/profile/:path*",
    "/settings/:path*"
  ],
};
