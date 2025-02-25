import { Navbar } from '@/components/navbar';
import { AuthUserProvider } from '@/providers/auth-user-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthUserProvider>
            <main className='relative flex flex-col items-center justify-center'>
                <Navbar />
                <div className='w-full max-w-5xl px-4 py-16'>{children}</div>
            </main>
        </AuthUserProvider>
    );
}
