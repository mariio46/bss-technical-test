'use client';

import { useQueryProduct } from '@/queries/client/products';
import { formatDateTime, toRupiah } from '@/utils';

import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const ProductContent = ({ id }: { id: string }) => {
    const { data, status } = useQueryProduct(id);

    return (
        <div className='max-w-lg'>
            <div className='overflow-hidden rounded-md border bg-background'>
                <Table>
                    <TableBody>
                        <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
                            <TableCell className='bg-muted/50 py-2 font-medium'>Name</TableCell>
                            {status === 'success' ? (
                                <TableCell className='py-2'>{data.product.name}</TableCell>
                            ) : (
                                <TableCell className='py-2'>
                                    <Skeleton className='h-3 w-40 rounded-sm' />
                                </TableCell>
                            )}
                        </TableRow>
                        <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
                            <TableCell className='bg-muted/50 py-2 font-medium'>Category</TableCell>
                            {status === 'success' ? (
                                <TableCell className='py-2'>{data.product.type}</TableCell>
                            ) : (
                                <TableCell className='py-2'>
                                    <Skeleton className='h-3 w-40 rounded-sm' />
                                </TableCell>
                            )}
                        </TableRow>
                        <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
                            <TableCell className='bg-muted/50 py-2 font-medium'>Price</TableCell>
                            {status === 'success' ? (
                                <TableCell className='py-2'>{toRupiah(data.product.price)}</TableCell>
                            ) : (
                                <TableCell className='py-2'>
                                    <Skeleton className='h-3 w-40 rounded-sm' />
                                </TableCell>
                            )}
                        </TableRow>
                        <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
                            <TableCell className='bg-muted/50 py-2 font-medium'>Stock</TableCell>
                            {status === 'success' ? (
                                <TableCell className='py-2'>{data.product.stock}</TableCell>
                            ) : (
                                <TableCell className='py-2'>
                                    <Skeleton className='h-3 w-40 rounded-sm' />
                                </TableCell>
                            )}
                        </TableRow>
                        <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
                            <TableCell className='bg-muted/50 py-2 font-medium'>Created</TableCell>
                            {status === 'success' ? (
                                <TableCell className='py-2'>
                                    {formatDateTime(new Date(data.product.created_at), 'HH:mm, MMM dd, yyyy')}
                                </TableCell>
                            ) : (
                                <TableCell className='py-2'>
                                    <Skeleton className='h-3 w-40 rounded-sm' />
                                </TableCell>
                            )}
                        </TableRow>
                        <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
                            <TableCell className='bg-muted/50 py-2 font-medium'>Updated</TableCell>
                            {status === 'success' ? (
                                <TableCell className='py-2'>
                                    {formatDateTime(new Date(data.product.updated_at), 'HH:mm, MMM dd, yyyy')}
                                </TableCell>
                            ) : (
                                <TableCell className='py-2'>
                                    <Skeleton className='h-3 w-40 rounded-sm' />
                                </TableCell>
                            )}
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export { ProductContent };
