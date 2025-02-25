import Link from 'next/link';

import { UserDropdown } from './user-dropdown';

const Navbar = () => {
    return (
        <nav className='border-muted-foreground/20 sticky flex w-full items-center justify-between border-b px-4 py-4'>
            <Link href='/' className='inline-flex text-2xl font-bold text-[#0d438d]'>
                BSS Parking
            </Link>

            <UserDropdown />
        </nav>
    );
};

export { Navbar };
