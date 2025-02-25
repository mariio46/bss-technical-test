'use client';

import { EllipsisVertical } from 'lucide-react';

import { useQueryProducts } from '@/queries/client/products';

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
                        <TableHead className='w-10 text-center'>#</TableHead>
                        <TableHead className='overflow-hidden whitespace-nowrap'>Name</TableHead>
                        <TableHead>Product Type</TableHead>
                        <TableHead className='overflow-hidden whitespace-nowrap'>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className='text-right' />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {status === 'pending' && <TableRowLoadingBlock colSpan={6} />}

                    {status === 'error' && <TableRowErrorBlock colSpan={6} />}

                    {status === 'success' && data.results.length <= 0 && <TableRowEmptyBlock colSpan={6} />}

                    {status === 'success' &&
                        data.results.length > 0 &&
                        data.results.map((product, index) => (
                            <TableRow key={product.uuid}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className='overflow-hidden whitespace-nowrap'>{product.name}</TableCell>
                                <TableCell className='capitalize'>{product.type}</TableCell>
                                <TableCell className='overflow-hidden whitespace-nowrap'>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>

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
