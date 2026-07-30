import { NextResponse, type NextRequest } from "next/server";

/**
 * Host routing only — deliberately NO authorization here.
 *
 * Auth is enforced in the data-access layer (`requireSession` / `requireApiUser`
 * in lib/auth.ts), which every admin page and route handler calls. Keeping
 * authorization out of middleware is the pattern Next.js recommends and sidesteps
 * the middleware-bypass class of CVEs entirely.
 */

const ADMIN_HOST_PREFIX = "admin.";

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase().split(":")[0];
  const isAdminHost = host.startsWith(ADMIN_HOST_PREFIX);
  const { pathname } = request.nextUrl;

  if (isAdminHost) {
    // Serve the /admin tree at the root of the admin host. Paths that already
    // carry the prefix (internal rewrites, asset requests) pass through as-is.
    const url = request.nextUrl.clone();
    url.pathname = pathname.startsWith("/admin")
      ? pathname
      : `/admin${pathname === "/" ? "" : pathname}`;

    const response = NextResponse.rewrite(url);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    // In dev there is no admin subdomain on localhost, so /admin stays reachable.
    // In production the admin tree must not be served from the marketing domain.
    if (process.env.NODE_ENV === "production") {
      return new NextResponse(null, { status: 404 });
    }
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Everything except Next internals and static assets:
     * _next/static, _next/image, the generated icons, robots/sitemap, and any
     * request with a static file extension served from /public.
     */
    "/((?!_next/static|_next/image|icon.png|apple-icon.png|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|woff|woff2|ttf)$).*)",
  ],
};
