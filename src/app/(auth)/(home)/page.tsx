import { CircleFadingPlus, ListFilterIcon, Trash2 } from 'lucide-react';

import { cn } from '@/utils';

import { Container } from '@/components/container';
import { Header, HeaderSubTitle, HeaderTitle } from '@/components/header';
import { PaginationInfo } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { InputIcon } from '@/components/ui/input-icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { ProductsTableContent } from '@/features/products/table-content';

export default function HomePage() {
    return (
        <Container>
            <Header className='mt-14'>
                <HeaderTitle>Product</HeaderTitle>
                <HeaderSubTitle className='max-w-xl'>
                    Manage your product list with ease. You can search, filter, add new products, edit existing ones,
                    and delete items as needed to keep your inventory organized and up to date.
                </HeaderSubTitle>
            </Header>

            <section id='table-header' className='mt-8'>
                <div className='grid gap-4 sm:grid-cols-4'>
                    <div className='order-last grid w-full shrink-0 gap-4 sm:order-1 sm:col-span-3 sm:grid-cols-3'>
                        <div className='flex items-center gap-4'>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant='outline'
                                            size='icon'
                                            className={cn(
                                                'bg-muted/20 text-destructive/75 hover:text-destructive dark:bg-muted/50 shrink-0',
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
                                icon={<ListFilterIcon className='size-4 stroke-[1.8]' />}
                                className='bg-muted/20 dark:bg-muted/50'
                                placeholder='Search name of product'
                            />
                        </div>
                        <Select>
                            <SelectTrigger className={cn('bg-muted/20 dark:bg-muted/50')}>
                                <SelectValue placeholder='Sort by price' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='+price'>Sort by cheapest</SelectItem>
                                <SelectItem value='-price'>Sort by expensive</SelectItem>
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
            </section>

            <section id='table-content' className='my-4'>
                <ProductsTableContent />
            </section>

            <section id='table-footer' className='mb-14'>
                <div className='flex items-center justify-between'>
                    <PaginationInfo to={10} total={1000} />
                </div>
            </section>
        </Container>
    );
}
