import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { env } from "./env/server.mjs";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname.startsWith('/auth') && session) {
    const url = req.nextUrl.clone();
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith('/r') && !session) {
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
