import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard", "/dashboard/user_"];
const publicRoutes = ["/signin", "/"];

export default async function middleware(req: NextRequest) {
  console.log("je suis le middleware");
  const requestAuteur = await fetch(`${process.env.SERVER_URL}/auteurs`, {
    cache: "no-cache",
  });
  const auteurs = await requestAuteur.json();
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute =
    path.includes(protectedRoutes[0]) || path.includes(protectedRoutes[1]);
  const isPublicRoute = publicRoutes.includes(path);
  // 3. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = cookie !== undefined ? await decrypt(cookie) : undefined;

  // 5. Redirect to /login if the user is not authenticated
  console.log(isProtectedRoute);
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    console.log(auteurs);
    if (auteurs.data.length === 0) {
      return NextResponse.redirect(new URL("/signup", req.nextUrl));
    }
    // return NextResponse.redirect(
    //   new URL(`/dashboard/user_${session?.userId}`, req.nextUrl)
    // );
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
