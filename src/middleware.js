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

// Define adminPages as a single regular expression string
const adminPagesPattern = `^(/(${locales.join(
  "|"
)}))?(/admin|/admin/|admin/:path*)$`;
const adminPagesRegex = new RegExp(adminPagesPattern, "i");

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.

  (req) => {
    /* Role based authentication */
    if (
      req?.nextauth?.token?.role !== "admin" &&
      adminPagesRegex.test(req?.nextUrl?.pathname)
    ) {
      return NextResponse.redirect(new URL("/denied", req.url));
    } else {
      return intlMiddleware(req);
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

export default function middleware(req) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return authMiddleware(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  // Match only internationalized pathnames
  matcher: ["/", "/(en|ar)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
