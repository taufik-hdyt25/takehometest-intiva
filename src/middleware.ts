import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = request.nextUrl.pathname;

  if (token?.randomToken && pathname === '/login') {
    return NextResponse.redirect(new URL('/transaction', request.url));
  }
  if (!token?.randomToken && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/transaction', request.url));
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ['/login', '/', '/transaction', '/production']
};
