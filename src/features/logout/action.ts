'use server';

import { axiosServer } from '@/lib/axios';
import { REFRESH_TOKEN_COOKIE_KEY } from '@/utils/cookie-key';
import { getHttpOnlyCookie, handleIfUnauthenticated } from '@/utils/server-utils';

export async function logout() {
    const refreshToken = await getHttpOnlyCookie(REFRESH_TOKEN_COOKIE_KEY);

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
