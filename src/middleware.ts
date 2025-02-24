import { NextResponse, type NextRequest } from 'next/server';

import { ACCESS_TOKEN_COOKIE_KEY } from './utils/cookie-key';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const path = request.nextUrl.pathname;
    const cookies = request.cookies;

    const protectedRoutes = ['/'];
    const guestRoutes = ['/login'];

    const accessToken = cookies.get(ACCESS_TOKEN_COOKIE_KEY);

    if (accessToken && guestRoutes.includes(path)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!accessToken && protectedRoutes.includes(path)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
