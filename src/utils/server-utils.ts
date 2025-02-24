import 'server-only';

import { cookies } from 'next/headers';

const cookieExpires = new Date(Date.now() + 600000);

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
