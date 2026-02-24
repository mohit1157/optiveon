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

    // Strict admin-only routes — requires ADMIN role AND email in allowlist
    const ADMIN_EMAILS = ["admin@optiveon.com", "mohit@optiveon.com", "balmiki@optiveon.com"];
    if (pathname.startsWith("/products/options")) {
      const email = token?.email as string | undefined;
      if (token?.role !== "ADMIN" || !email || !ADMIN_EMAILS.includes(email)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Admin-only routes (general)
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
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
          "/careers",
          "/products/stocks",
          "/products/polymarket",
          "/products/futes",
          "/products/forex",
        ];

        // API routes that don't need auth
        const publicApiRoutes = [
          "/api/auth",
          "/api/contact",
          "/api/webhooks",
          "/api/market",
          "/api/chatbot",
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
