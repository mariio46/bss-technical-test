import { ChevronRight, ChevronsLeft } from 'lucide-react';

import { cn } from '@/utils';

import { Button } from './ui/button';

interface PaginationInfoProps extends React.ComponentProps<'div'> {
    to: number;
    total: number;
}

const PaginationInfo = ({ className, to, total, ...props }: PaginationInfoProps) => {
    return (
        <div
            className={cn(
                'text-muted-foreground w-full text-sm [&_span]:font-medium [&_span]:text-foreground',
                className,
            )}
            {...props}>
            <p>
                Showing <span>{to}</span> of <span>{total}</span> results
            </p>
        </div>
    );
};

interface PaginationActionProps {
    disabledLeftButton: boolean;
    disabledRightButton: boolean;
    nextPage: () => void;
    previousPage: () => void;
    children: React.ReactNode;
}

const PaginationAction = ({
    nextPage,
    previousPage,
    disabledLeftButton,
    disabledRightButton,
    children,
}: PaginationActionProps) => {
    return (
        <div className='flex items-center justify-center gap-4'>
            <Button
                disabled={disabledLeftButton}
                onClick={previousPage}
                className='flex-shrink-0 rounded-lg'
                variant='outline'
                size='icon'>
                <ChevronsLeft className='stroke-[1.8]' />
                <span className='sr-only'>Previous page</span>
            </Button>

            {children}

            <Button
                disabled={disabledRightButton}
                onClick={nextPage}
                className='flex-shrink-0 rounded-lg'
                variant='outline'
                size='icon'>
                <ChevronRight className='stroke-[1.8]' />
                <span className='sr-only'>Next page</span>
            </Button>
        </div>
    );
};

export { PaginationAction, PaginationInfo };
