import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

import type { ApiResponse } from '@/types/api';
import type { Product } from '@/types/api/product';

import { useDebounce } from '@/hooks/use-debounce';
import { axiosClient } from '@/lib/axios';

type Params = {
    page: number;
    search: string;
    order_by: string | null;
    size: number;
};

async function getProducts(params: Params, url: string = '/api/products') {
    return await axiosClient.get<ApiResponse<Product[]>>(url, { params }).then((res) => res.data);
}

export const useQueryProducts = () => {
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
    const [size, setSize] = useQueryState('size', parseAsInteger.withDefault(10));
    const [order, setOrder] = useQueryState('order_by');
    const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));

    const debounceValue = useDebounce(search);

    const params: Params = {
        page,
        size,
        order_by: order,
        search: debounceValue,
    };

    const query = useQuery({
        queryKey: ['products', 'lists', params],
        queryFn: () => getProducts(params),
    });

    return { query, queryState: { page, setPage, size, setSize, order, setOrder, search, setSearch } };
};
