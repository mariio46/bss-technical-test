import { cn } from '@/utils';

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

export { PaginationInfo };
