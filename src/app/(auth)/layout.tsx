import * as React from 'react';

import { Navbar } from '@/components/navbar';
import { AuthUserProvider } from '@/providers/auth-user-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthUserProvider>
            <main className='relative flex flex-col items-center justify-center'>
                <Navbar />
                <React.Suspense>
                    <div className='w-full'>{children}</div>
                </React.Suspense>
            </main>
        </AuthUserProvider>
    );
}
