'use client';

import * as React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// prettier-ignore
const TanstackQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                gcTime: 5 * 60 * 1000,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
        </QueryClientProvider>
    );
};

export { TanstackQueryProvider };
