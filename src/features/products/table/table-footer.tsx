'use client';

import { useQueryProducts } from '@/queries/client/products';

import { PaginationAction, PaginationInfo } from '@/components/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const ProductsTableFooter = () => {
    const { query, queryState } = useQueryProducts();

    const { data, status } = query;
    const { setPage, page, size, setSize } = queryState;

    function nextPage() {
        setPage((prevState) => prevState + 1);
    }

    function previousPage() {
        setPage((prevState) => prevState - 1);
    }

    return (
        <div className='flex flex-col justify-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0'>
            {status === 'success' ? (
                <PaginationInfo className='text-center sm:text-start' to={data.results.length} total={data.count} />
            ) : (
                <Skeleton className='h-6 w-60' />
            )}

            {status === 'success' ? (
                <PaginationAction
                    disabledLeftButton={!data.previous || page < 0}
                    disabledRightButton={!data.next}
                    nextPage={nextPage}
                    previousPage={previousPage}>
                    <Select value={size.toString()} onValueChange={(e) => setSize(Number(e))}>
                        <SelectTrigger className='w-[7.5rem] flex-shrink-0 rounded-lg'>
                            <SelectValue placeholder={`${size} / page`} />
                        </SelectTrigger>
                        <SelectContent className='rounded-lg'>
                            <SelectItem value='10'>10 / page</SelectItem>
                            <SelectItem value='20'>20 / page</SelectItem>
                            <SelectItem value='30'>30 / page</SelectItem>
                            <SelectItem value='40'>40 / page</SelectItem>
                            <SelectItem value='50'>50 / page</SelectItem>
                            <SelectItem value='100'>100 / page</SelectItem>
                        </SelectContent>
                    </Select>
                </PaginationAction>
            ) : (
                <Skeleton className='h-6 w-40' />
            )}
        </div>
    );
};

export { ProductsTableFooter };
