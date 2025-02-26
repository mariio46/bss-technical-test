import type { AxiosError } from 'axios';

import { axiosServer } from '@/lib/axios';
import { handleIfUnauthenticated } from '@/utils/server-utils';

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_: Request, { params }: Params) {
    const id = (await params).id;

    try {
        await axiosServer.delete(`database/rows/table/455904/${id}/`, {
            headers: {
                Authorization: process.env.DB_TOKEN,
            },
        });

        return Response.json({ message: 'Product has been deleted successfully.' }, { status: 200 });
    } catch (e) {
        const error = e as AxiosError;

        if (error.status === 401) {
            await handleIfUnauthenticated();
            return Response.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        return Response.json({ message: 'Something went wrong' }, { status: error.status });
    }
}
