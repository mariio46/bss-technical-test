'use server';

import { redirect } from 'next/navigation';

import type { AxiosError } from 'axios';

import { axiosServer } from '@/lib/axios';
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY, USER_SESSION_COOKIE_KEY } from '@/utils/cookie-key';
import { setHttpOnlyCookie } from '@/utils/server-utils';
import { loginSchema } from './schema';

type ErrorResponse = {
    email?: string[];
    password?: string[];
    message?: string;
};

type SuccessResponse = {
    access_token: string;
    refresh_token: string;
    user_session: string;
};

export async function login(_: unknown, formData: FormData) {
    const values = Object.fromEntries(formData.entries());

    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors } as { error: ErrorResponse };
    }

    const { data: payload } = validatedFields;

    try {
        const { data } = await axiosServer.post<SuccessResponse>('/user/token-auth/', payload);

        await setHttpOnlyCookie(ACCESS_TOKEN_COOKIE_KEY, data.access_token);
        await setHttpOnlyCookie(REFRESH_TOKEN_COOKIE_KEY, data.refresh_token);
        await setHttpOnlyCookie(USER_SESSION_COOKIE_KEY, data.user_session);
    } catch (e) {
        console.log(e);
        const error = e as AxiosError<{ email?: string[]; password?: string[]; error?: string; detail?: string }>;

        if (error.status === 400 && error.response) {
            const errors = error.response.data;

            return {
                error: { email: errors.email?.[0], password: errors.password?.[0] },
            } as { error: ErrorResponse };
        }

        if (error.status === 401 && error.response) {
            const errors = error.response.data;

            return {
                error: { message: errors.detail },
            } as { error: ErrorResponse };
        }

        return { error: { message: 'Server is busy!' } } as { error: ErrorResponse };
    }

    redirect('/');
}
