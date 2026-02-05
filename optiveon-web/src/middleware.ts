import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Redirect authenticated users away from auth pages
    if (
      token &&
      (pathname.startsWith("/login") || pathname.startsWith("/register"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Admin-only routes
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes
        const publicRoutes = [
          "/",
          "/login",
          "/register",
          "/forgot-password",
          "/verify-email",
          "/checkout",
          "/privacy",
          "/terms",
          "/disclaimer",
        ];

        // API routes that don't need auth
        const publicApiRoutes = [
          "/api/auth",
          "/api/contact",
          "/api/webhooks",
          "/api/market",
        ];

        // Check if it's a public route
        if (
          publicRoutes.some(
            (route) => pathname === route || pathname.startsWith(route + "/")
          )
        ) {
          return true;
        }

        // Check if it's a public API route
        if (publicApiRoutes.some((route) => pathname.startsWith(route))) {
          return true;
        }

        // Check if it's a static file or Next.js internal route
        if (pathname.startsWith("/_next") || pathname.includes(".")) {
          return true;
        }

        // All other routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    // Match all routes except static files
    "/((?!_next/static|_next/image|images|favicon.ico).*)",
  ],
};
