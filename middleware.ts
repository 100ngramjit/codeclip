import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  const url = new URL(req.url);
  const isClipRoute = url.pathname.startsWith("/feed/clip/");
  const isDashboardRoute = url.pathname.startsWith("/feed");

  if (!auth().userId && isDashboardRoute && !isClipRoute) {
    return auth().redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
