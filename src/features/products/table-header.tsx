'use client';

import { CircleFadingPlus, ListFilterIcon, Trash2 } from 'lucide-react';

import { useQueryProducts } from '@/queries/client/products';
import { cn } from '@/utils';

import { Button } from '@/components/ui/button';
import { InputIcon } from '@/components/ui/input-icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ProductsTableHeader = () => {
    const { query, queryState } = useQueryProducts();
    const { status } = query;
    const { search, setSearch, resetQueryState, order, setOrder } = queryState;

    const state = Object.values({ search, order }).some((item) => item !== '' && item !== null);

    return (
        <div className='grid gap-4 sm:grid-cols-4'>
            <div className='order-last grid w-full shrink-0 gap-4 sm:order-1 sm:col-span-3 sm:grid-cols-3'>
                <div className='flex items-center gap-4'>
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => resetQueryState()}
                                    variant='outline'
                                    size='icon'
                                    className={cn(
                                        'bg-muted/20 text-destructive/75 hover:text-destructive dark:bg-muted/50 shrink-0',
                                        !state && 'hidden',
                                    )}>
                                    <Trash2 className='stroke-2' />
                                    <span className='sr-only'>Reset Filter</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent showArrow={true}>
                                <p>Reset</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <InputIcon
                        disabled={status === 'pending' || status === 'error'}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        icon={<ListFilterIcon className='size-4 stroke-[1.8]' />}
                        className='bg-muted/20 dark:bg-muted/50'
                        placeholder='Search name of product'
                    />
                </div>
                <Select
                    value={order ?? ''}
                    onValueChange={(e) => setOrder(e)}
                    disabled={status === 'pending' || status === 'error'}>
                    <SelectTrigger
                        className={cn(
                            'bg-muted/20 dark:bg-muted/50',
                            !order ? 'text-muted-foreground' : 'text-foreground',
                        )}>
                        <SelectValue placeholder='Sort by price' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='+name'>Sort from A-Z</SelectItem>
                        <SelectItem value='-name'>Sort from Z-A</SelectItem>
                        <SelectItem value='+price'>Sort from cheapest</SelectItem>
                        <SelectItem value='-price'>Sort from expensive</SelectItem>
                        <SelectItem value='+stock'>Sort from lest stock</SelectItem>
                        <SelectItem value='-stock'>Sort from lots stock</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='order-1 w-full text-end sm:order-last sm:col-span-1'>
                <Button className='w-full lg:w-min'>
                    <CircleFadingPlus />
                    Add product
                </Button>
            </div>
        </div>
    );
};

export { ProductsTableHeader };
