interface GuestLayoutProps {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
        <main className='bg-muted/30 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
            <div className='w-full max-w-xl'>{children}</div>
        </main>
    );
}
