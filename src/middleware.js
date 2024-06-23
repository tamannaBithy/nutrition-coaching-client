import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { locales } from "./navigation";

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

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  (req) => {
    const pathname = req.nextUrl.pathname;
    const token = req.nextauth?.token;

    if (!token?.role) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token.role !== "admin" && /^\/admin($|\/)/i.test(pathname)) {
      return NextResponse.redirect(new URL("/denied", req.url));
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const isPublicPage = publicPages.some(
    (page) => pathname === page || pathname.startsWith(`${page}/`)
  );

  if (isPublicPage) {
    return intlMiddleware(req);
  }

  return authMiddleware(req);
}

export const config = {
  matcher: ["/", "/(en|ar)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
