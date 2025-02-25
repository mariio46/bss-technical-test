import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { TanstackQueryProvider } from './tanstack-query-provider';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <TanstackQueryProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
        </TanstackQueryProvider>
    );
};

export { RootProvider };
