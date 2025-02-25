'use client';

import * as React from 'react';

import Link from 'next/link';

import { Loader, LogOut } from 'lucide-react';

import { logout } from '@/features/logout/action';
import { useQueryAuthUser } from '@/queries/client/auth-user';
import { acronym } from '@/utils';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown';
import { Skeleton } from './ui/skeleton';

const UserDropdown = () => {
    const [loading, setLoading] = React.useState(false);

    const { data, status } = useQueryAuthUser();

    function handleLogout(e: Event) {
        e.preventDefault();
        setLoading(true);
        logout();
        setTimeout(() => setLoading(false), 1000);
    }

    return (
        <>
            {status === 'pending' && (
                <div className='flex items-center gap-3'>
                    <Skeleton className='size-10 rounded-full' />
                </div>
            )}

            {status === 'error' && (
                <div className='flex items-center gap-3'>
                    <Button asChild>
                        <Link href='/login'>Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href='/register'>Register</Link>
                    </Button>
                </div>
            )}

            {status === 'success' && data.user && (
                <div className='flex items-center gap-3'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className='relative'>
                                <Avatar>
                                    <AvatarImage src={data.user.username} alt={data.user.first_name} />
                                    <AvatarFallback>{acronym(data.user.first_name)}</AvatarFallback>
                                </Avatar>
                                <span className='absolute bottom-0 end-0 size-3 rounded-full border-2 border-background bg-emerald-500'>
                                    <span className='sr-only'>Online</span>
                                </span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='min-w-56' align='end'>
                            <DropdownMenuLabel className='p-0 font-normal'>
                                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                    <Avatar className='h-8 w-8 rounded-[0.425rem]'>
                                        <AvatarImage src={data.user.username} alt={data.user.first_name} />
                                        <AvatarFallback className='rounded-[0.425rem]'>
                                            {acronym(data.user.first_name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='grid flex-1 text-left text-sm leading-tight'>
                                        <span className='truncate font-semibold'>{data.user.first_name}</span>
                                        <span className='truncate text-xs'>{data.user.username}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onSelect={handleLogout}
                                disabled={loading}
                                className='focus:bg-destructive/10 focus:text-destructive'>
                                {loading ? (
                                    <Loader className='animate-spin stroke-[1.8]' />
                                ) : (
                                    <LogOut className='stroke-[1.8]' />
                                )}
                                {loading ? 'Processing...' : 'Log out'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </>
    );
};

export { UserDropdown };
