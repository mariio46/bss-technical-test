import type { AxiosError } from 'axios';

import type { Product } from '@/types/api/product';
import type { Params } from '@/types/app';

import { axiosServer } from '@/lib/axios';
import { handleIfUnauthenticated } from '@/utils/server-utils';

export async function GET(_: Request, { params }: Params<{ id: string }>) {
    const id = (await params).id;

    try {
        const { data } = await axiosServer.get<Product>(`/database/rows/table/455904/${id}/?user_field_names=true`, {
            headers: {
                Authorization: process.env.DB_TOKEN,
            },
        });

        return Response.json({ product: data }, { status: 200 });
    } catch (e) {
        const error = e as AxiosError;

        if (error.status === 401) {
            await handleIfUnauthenticated();
            return Response.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        if (error.status === 404) {
            return Response.json({ message: `Product with id ${id} cannot be found!` }, { status: 404 });
        }

        return Response.json({ message: 'Something went wrong' }, { status: error.status });
    }
}
