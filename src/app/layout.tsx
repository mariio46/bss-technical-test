import type { Metadata } from 'next';

import { cn } from '@/utils';
import { geistMono, geistSans } from './fonts';

import { RootProvider } from '@/providers';

import './globals.css';

export const metadata: Metadata = {
    title: {
        default: 'BSS Parking',
        template: '%s - BSS Parking',
    },
    description: 'Solusi Manajemen Parkir Terlengkap: Seamless, Otomatis, dan Terpercaya',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className={cn(geistSans.variable, geistMono.variable)} suppressHydrationWarning>
            <body className='font-sans antialiased' suppressHydrationWarning>
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
