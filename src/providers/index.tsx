import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Toaster } from '@/components/ui/toaster';
import { TanstackQueryProvider } from './tanstack-query-provider';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <TanstackQueryProvider>
            <NuqsAdapter>
                {children}
                <Toaster duration={10000} position='top-center' closeButton={true} />
            </NuqsAdapter>
        </TanstackQueryProvider>
    );
};

export { RootProvider };
