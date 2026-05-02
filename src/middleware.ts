import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    // Restrict /dashboard purely to ADMINs
    if (isDashboard && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/tasks", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*", "/progress/:path*"],
};
