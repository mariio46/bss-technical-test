import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY, USER_SESSION_COOKIE_KEY } from './cookie-key';

const cookieExpires = new Date(Date.now() + 1800000);

export async function setHttpOnlyCookie(key: string, value: string) {
    const cookieStore = await cookies();

    cookieStore.set({
        name: key,
        value: value,
        httpOnly: true,
        expires: cookieExpires,
        path: '/',
        secure: true,
        sameSite: 'lax',
    });
}

export async function deleteHttpOnlyCookie(key: string) {
    const cookieStore = await cookies();

    cookieStore.delete(key);
}

export async function getHttpOnlyCookie(key: string) {
    const cookieStore = await cookies();

    return cookieStore.get(key);
}

export async function handleIfUnauthenticated() {
    await deleteHttpOnlyCookie(ACCESS_TOKEN_COOKIE_KEY);
    await deleteHttpOnlyCookie(REFRESH_TOKEN_COOKIE_KEY);
    await deleteHttpOnlyCookie(USER_SESSION_COOKIE_KEY);
    redirect('/login');
}
