import { EllipsisVertical } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown';

import { Button } from './ui/button';

const TableColumnDropdownAction = ({ children }: { children: React.ReactNode }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type='button' variant='ghost' size='icon' className='w-5 [&_svg]:size-4'>
                    <span className='sr-only'>Toggle table action</span>
                    <EllipsisVertical className='stroke-[1.8]' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='min-w-[12rem]'>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { TableColumnDropdownAction };
