import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as jose from "jose";
import { NextRequest } from "next/server";

const SECRET = process.env.SECRET;
console.log(SECRET, '<=== env secret');

export async function middleware(request: NextRequest) {
  try {

    const cookAuth = cookies().get("Authorization");
    
    if (!cookAuth) {
      
      throw new Error("Invalid token");
    }

    const token = cookAuth.value.split(" ")[1];

    if (!token) {
      throw new Error("Invalid token");
    }

    const secret = new TextEncoder().encode(SECRET);
    
    const decoded = await jose.jwtVerify<{_id: string; email: string}>(token, secret);

    if (!decoded) {
      throw new Error('Error di decoded');
    }
    const reqHeaders = new Headers(request.headers);
    reqHeaders.set("x-user-id", decoded.payload._id);    
    reqHeaders.set("x-user-email", decoded.payload.email);

    return NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });

  } catch (error) {
    console.error(error);
    const url = new URL('/account/login', request.url);
    return NextResponse.redirect(url); // Redirect ke halaman login jika token tidak valid
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/product/:path*", "/api/wishlist/:path*","/products/:path*"],
};
