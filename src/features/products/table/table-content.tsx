'use client';

import { EllipsisVertical } from 'lucide-react';

import { useQueryProducts } from '@/queries/client/products';
import { formatDateTime, toRupiah } from '@/utils';

import { TableRowEmptyBlock, TableRowErrorBlock, TableRowLoadingBlock } from '@/components/table-blocks';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ProductsTableContent = () => {
    const { data, status } = useQueryProducts().query;

    return (
        <div className='grid overflow-hidden rounded-md border bg-background'>
            <Table>
                <TableHeader className='bg-muted/50'>
                    <TableRow className='hover:bg-transparent'>
                        <TableHead className='w-[10px]'>Stock</TableHead>
                        <TableHead className='min-w-[12.5rem]'>Product</TableHead>
                        <TableHead className='overflow-hidden whitespace-nowrap'>Price</TableHead>
                        <TableHead className='overflow-hidden whitespace-nowrap'>Created</TableHead>
                        <TableHead className='overflow-hidden whitespace-nowrap'>Updated</TableHead>
                        <TableHead className='text-right' />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {status === 'pending' && <TableRowLoadingBlock colSpan={6} />}

                    {status === 'error' && <TableRowErrorBlock colSpan={6} />}

                    {status === 'success' && data.results.length <= 0 && <TableRowEmptyBlock colSpan={6} />}

                    {status === 'success' &&
                        data.results.length > 0 &&
                        data.results.map((product) => (
                            <TableRow key={product.uuid}>
                                <TableCell className='w-[10px]'>{product.stock}</TableCell>
                                <TableCell className='flex min-w-[12.5rem] flex-col gap-0.5'>
                                    <h4 className='font-medium text-foreground'>{product.name}</h4>
                                    <span className='text-xs text-muted-foreground'>Category: {product.type}</span>
                                </TableCell>
                                <TableCell className='overflow-hidden whitespace-nowrap'>
                                    {toRupiah(product.price)}
                                </TableCell>
                                <TableCell className='overflow-hidden whitespace-nowrap'>
                                    {formatDateTime(new Date(product.created_at), 'HH:mm, MMM dd, yyyy')}
                                </TableCell>
                                <TableCell className='overflow-hidden whitespace-nowrap'>
                                    {formatDateTime(new Date(product.updated_at), 'HH:mm, MMM dd, yyyy')}
                                </TableCell>
                                <TableCell className='text-right'>
                                    <Button variant='ghost' size='icon' className='w-5 [&_svg]:size-4'>
                                        <EllipsisVertical className='stroke-[1.8]' />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export { ProductsTableContent };
