'use client';

import { ChevronDown, PencilLine, Trash2 } from 'lucide-react';

import { useQueryProduct } from '@/queries/client/products';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { Skeleton } from '@/components/ui/skeleton';

import { DeleteProductDialog } from '../delete/dialog';
import { UpdateProductDialog } from '../update/dialog';

const ProductHeader = ({ id }: { id: string }) => {
    const { data, status } = useQueryProduct(id);

    return (
        <div className='flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between'>
            <div className='flex flex-col gap-0.5'>
                {status === 'success' ? (
                    <>
                        <h3 className='max-w-2xl text-lg font-semibold'>{data.product.name}</h3>
                        <p className='text-sm text-muted-foreground'>In Category: {data.product.type}</p>
                    </>
                ) : (
                    <>
                        <Skeleton className='mb-1 h-6 w-80 rounded-sm' />
                        <Skeleton className='h-4 w-40 rounded-sm' />
                    </>
                )}
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger disabled={status === 'pending' || status === 'error'} asChild>
                        <Button type='button' variant='outline' className='[&_svg]:size-4'>
                            <span>Action</span>
                            <ChevronDown className='stroke-[1.8]' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' side='bottom' className='min-w-[12rem]'>
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {status === 'success' ? (
                            <UpdateProductDialog product={data.product} source='show'>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <PencilLine className='stroke-[1.8]' />
                                    Update Product
                                </DropdownMenuItem>
                            </UpdateProductDialog>
                        ) : (
                            <Skeleton className='h-7 w-full rounded-sm' />
                        )}
                        <DropdownMenuSeparator />
                        {status === 'success' ? (
                            <DeleteProductDialog product={data.product} source='show'>
                                <DropdownMenuItem
                                    className='text-destructive focus:text-destructive'
                                    onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className='stroke-[1.8]' />
                                    Delete Product
                                </DropdownMenuItem>
                            </DeleteProductDialog>
                        ) : (
                            <Skeleton className='h-7 w-full rounded-sm' />
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export { ProductHeader };
