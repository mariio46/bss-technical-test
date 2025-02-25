import { Loader, PackageOpen, Skull } from 'lucide-react';

import { cn } from '@/utils';

import { TableCell, TableRow } from './ui/table';

const TableRowLoadingBlock = ({
    className,
    ...props
}: Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'children'>) => {
    return (
        <TableRow>
            <TableCell
                className={cn(
                    'h-16 text-balance text-center font-semibold tracking-wider [&>svg]:inline-flex',
                    className,
                )}
                {...props}>
                <div className='flex flex-col items-center gap-2.5'>
                    <Loader className='size-7 animate-spin stroke-[1.8]' />
                    <span>Fetching your data...</span>
                </div>
            </TableCell>
        </TableRow>
    );
};

const TableRowEmptyBlock = ({
    className,
    ...props
}: Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'children'>) => {
    return (
        <TableRow>
            <TableCell className={cn('h-16 text-center font-semibold tracking-wider', className)} {...props}>
                <div className='flex flex-col items-center gap-2.5'>
                    <PackageOpen className='size-7 stroke-[1.8]' />
                    <span>No data</span>
                </div>
            </TableCell>
        </TableRow>
    );
};

const TableRowErrorBlock = ({
    className,
    ...props
}: Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'children'>) => {
    return (
        <TableRow>
            <TableCell
                className={cn('text-destructive h-16 text-center font-semibold tracking-wider', className)}
                {...props}>
                <div className='flex flex-col items-center gap-2.5'>
                    <Skull className='size-7 stroke-[1.8]' />
                    <span>Something went wrong</span>
                </div>
            </TableCell>
        </TableRow>
    );
};

export { TableRowEmptyBlock, TableRowErrorBlock, TableRowLoadingBlock };
