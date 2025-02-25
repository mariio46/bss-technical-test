import 'client-only';

import * as React from 'react';

import { useQuery } from '@tanstack/react-query';

import type { User } from '@/types/api/user';

import { axiosClient } from '@/lib/axios';

async function getAuthUser() {
    return await axiosClient.get<{ user: User }>('/api/auth/auth-user').then((res) => res.data);
}

/* eslint react-hooks/exhaustive-deps: 0 */
export const useQueryAuthUser = () => {
    const lastUpdatedRef = React.useRef<number | null>(null);

    const query = useQuery({
        queryKey: ['auth-user'],
        queryFn: getAuthUser,
        retry: (failureCount, error) => {
            if (error.status === 401) {
                return false;
            }
            return failureCount < 3;
        },
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    });

    React.useEffect(() => {
        if (query.dataUpdatedAt && query.dataUpdatedAt !== lastUpdatedRef.current) {
            lastUpdatedRef.current = query.dataUpdatedAt;
        }

        if (query.isError && query.error.status === 401) {
            window.location.reload();
        }
    }, [query.dataUpdatedAt, query.isError, query.error]);

    return query;
};
