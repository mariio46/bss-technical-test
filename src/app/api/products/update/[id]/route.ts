import type { AxiosError } from 'axios';

import type { ApiErrorValidation, FieldError } from '@/types/api';
import type { Product } from '@/types/api/product';

import { axiosServer } from '@/lib/axios';
import { handleIfUnauthenticated } from '@/utils/server-utils';

type Params = { params: Promise<{ id: string }> };

type CreateProductError = ApiErrorValidation<{
    name: FieldError[];
    type: FieldError[];
    price: FieldError[];
    stock: FieldError[];
}>;

export async function PATCH(request: Request, { params }: Params) {
    const payload = await request.json();
    const id = (await params).id;

    try {
        const { data } = await axiosServer.patch<Product>(
            `/database/rows/table/455904/${id}/?user_field_names=true`,
            payload,
            {
                headers: {
                    Authorization: process.env.DB_TOKEN,
                },
            },
        );

        return Response.json({ product: data }, { status: 200 });
    } catch (e) {
        const error = e as AxiosError<CreateProductError>;

        if (error.status === 400 && error.response) {
            const { name, price, stock, type } = error.response.data.detail;

            const errors = {
                name: [name[0].error],
                price: [price[0].error],
                type: [type[0].error],
                stock: [stock[0].error],
            };

            return Response.json({ errors }, { status: 422 });
        }

        if (error.status === 401) {
            await handleIfUnauthenticated();
            return Response.json({ message: 'Unauthenticated' }, { status: 401 });
        }

        return Response.json({ message: 'Something went wrong' }, { status: error.status });
    }
}
