'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { axiosServer } from '@/lib/axios';
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY, USER_SESSION_COOKIE_KEY } from '@/utils/cookie-key';
import { deleteHttpOnlyCookie } from '@/utils/server-utils';

async function handleIfUnauthenticated() {
    await deleteHttpOnlyCookie(ACCESS_TOKEN_COOKIE_KEY);
    await deleteHttpOnlyCookie(REFRESH_TOKEN_COOKIE_KEY);
    await deleteHttpOnlyCookie(USER_SESSION_COOKIE_KEY);
    redirect('/login');
}

export async function logout() {
    const cookiesStore = await cookies();

    const refreshToken = cookiesStore.get(REFRESH_TOKEN_COOKIE_KEY);

    if (!refreshToken) {
        await handleIfUnauthenticated();
        return;
    }

    const payload = { refresh_token: refreshToken.value };

    try {
        await axiosServer.post('/user/token-blacklist/', payload);
    } catch (e) {
        console.error(e);
    } finally {
        await handleIfUnauthenticated();
    }
}
