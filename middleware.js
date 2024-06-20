import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { locales } from "./navigation";

// Public pages array
const publicPages = [
  "/",
  "/weekly-menu",
  "/our-plans",
  "/calculators",
  "/blogs",
  "/login",
  "/register",
  "/reset-password",
];

// Admin pages regular expression pattern
const adminPagesPattern = `^(/(${locales.join(
  "|"
)}))?(/admin|/admin/|/admin/:path*)$`;
const adminPagesRegex = new RegExp(adminPagesPattern, "i");

// Initialize internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

// Initialize authentication middleware
const authMiddleware = withAuth(
  (req) => {
    try {
      // Role-based authentication
      if (
        req?.nextauth?.token?.role !== "admin" &&
        adminPagesRegex.test(req?.nextUrl?.pathname)
      ) {
        console.log("Redirecting to /denied due to insufficient permissions");
        return NextResponse.redirect(new URL("/denied", req.url));
      } else {
        console.log("Proceeding with intlMiddleware");
        return intlMiddleware(req);
      }
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Main middleware function
export default async function middleware(req) {
  try {
    console.log("Middleware invoked for:", req.nextUrl.pathname);

    const publicPathnameRegex = new RegExp(
      `^(/(${locales.join("|")}))?(${publicPages
        .flatMap((p) => (p === "/" ? ["", "/"] : [p]))
        .join("|")})/?$`,
      "i"
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    // Process internationalization middleware first
    const intlResponse = await intlMiddleware(req);
    console.log("intlMiddleware response:", intlResponse);

    if (isPublicPage) {
      console.log("Public page detected:", req.nextUrl.pathname);
      return intlResponse;
    } else {
      const authResponse = await authMiddleware(req);
      console.log("authMiddleware response:", authResponse);
      return authResponse || intlResponse;
    }
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Configuration for the middleware
export const config = {
  // Match only internationalized pathnames, excluding API routes and static assets
  matcher: ["/", "/(en|ar)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
