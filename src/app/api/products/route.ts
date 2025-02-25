import type { NextRequest } from 'next/server';

import type { AxiosError } from 'axios';

import type { ApiResponse } from '@/types/api';
import type { Product } from '@/types/api/product';

import { axiosServer } from '@/lib/axios';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const token = process.env.DB_TOKEN;

    const params = {
        user_field_names: true,
        page: searchParams.get('page') ?? 1,
        search: searchParams.get('search') ?? '',
        order_by: searchParams.get('order_by') ?? null,
        size: searchParams.get('size') ?? 10,
    };

    try {
        const { data } = await axiosServer.get<ApiResponse<Product[]>>('/database/rows/table/455904/', {
            headers: {
                Authorization: token,
            },
            params: params,
        });

        return Response.json(data, { status: 200 });
    } catch (e) {
        const error = e as AxiosError;

        return Response.json({ message: 'Something went wrong' }, { status: error.status });
    }
}
