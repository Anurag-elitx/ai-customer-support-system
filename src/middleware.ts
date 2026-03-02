import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("firebase_auth"); // Note: This requires setting a cookie on the client side, or using Firebase Admin. For MVP, we'll use client-side redirects for now or a simpler check.
  
  // For a robust middleware, we usually need Firebase Admin to verify tokens in cookies.
  // Since we are using client-side Firebase, I'll implement a basic redirect in the layout/components instead,
  // OR use a cookie-based approach if the user sets it up.
  
  // However, a simple way to protect routes in Next.js without a full Admin SDK setup is to check for a cookie.
  
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && !session) {
    // Redirect to login if trying to access dashboard without a session cookie
    // return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
