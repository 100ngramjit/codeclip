import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const url = new URL(req.url);
  const isClipRoute = url.pathname.startsWith("/dashboard/clip/");
  const isDashboardRoute = url.pathname.startsWith("/dashboard");

  const { userId, redirectToSignIn } = await auth();

  if (!userId && isDashboardRoute && !isClipRoute) {
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
