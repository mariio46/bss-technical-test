import { keepPreviousData, useQuery } from '@tanstack/react-query';
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

    function resetQueryState(withPage: boolean = false, withSize: boolean = false) {
        if (withPage) {
            setPage(1);
        }
        if (withSize) {
            setSize(10);
        }
        setOrder(null);
        setSearch('');
    }

    const params: Params = {
        page,
        size,
        order_by: order,
        search: debounceValue,
    };

    const query = useQuery({
        queryKey: ['products', 'lists', params],
        queryFn: () => getProducts(params),
        placeholderData: keepPreviousData,
    });

    return { query, queryState: { page, setPage, size, setSize, order, setOrder, search, setSearch, resetQueryState } };
};

async function getProduct(id: string) {
    return await axiosClient.get<{ product: Product }>(`/api/products/detail/${id}`).then((res) => res.data);
}

export const useQueryProduct = (id: string) => {
    return useQuery({
        queryKey: ['products', 'detail', { id }],
        queryFn: () => getProduct(id),
    });
};
