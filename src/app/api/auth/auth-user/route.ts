import type { AxiosError } from 'axios';

import type { User } from '@/types/api/user';

import { axiosServer } from '@/lib/axios';
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from '@/utils/cookie-key';
import { getHttpOnlyCookie, handleIfUnauthenticated } from '@/utils/server-utils';

export async function GET() {
    const accessToken = await getHttpOnlyCookie(ACCESS_TOKEN_COOKIE_KEY);
    const refreshToken = await getHttpOnlyCookie(REFRESH_TOKEN_COOKIE_KEY);

    if (!accessToken || !refreshToken) {
        await handleIfUnauthenticated();
        return Response.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    const payload = {
        access_token: accessToken.value,
        refresh_token: refreshToken.value,
    };

    try {
        const { data } = await axiosServer.post<{ user: User }>('/user/token-verify/', payload);

        return Response.json({ user: data.user }, { status: 200 });
    } catch (e) {
        const error = e as AxiosError;

        await handleIfUnauthenticated();

        if (error.status === 401) {
            return Response.json({ message: 'Unauthenticated' }, { status: 401 });
        }
    }

    return Response.json(payload, { status: 200 });
}
