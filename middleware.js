import { NextResponse } from 'next/server';
import toast from 'react-hot-toast';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/auth/register' || path === '/auth/login';

  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token) {
    // If logged in, block access to login/register and redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isPublicPath && !token) {
    // If not logged in, block access to protected routes and redirect to login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Middleware passed:', path);
  }

  // Allow request to continue
  return NextResponse.next();
}


export const config = {
  matcher: ['/about2/:path*', '/dashboard/:path*', '/auth/login', '/auth/register'],
};
