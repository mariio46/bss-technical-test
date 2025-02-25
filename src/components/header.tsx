import { cn } from '@/utils';

const Header = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn('flex w-full flex-col', className)} {...props}>
            {children}
        </div>
    );
};

const HeaderTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h1 className={cn('text-xl font-bold text-foreground lg:text-3xl', className)} {...props}>
            {children}
        </h1>
    );
};

const HeaderSubTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
    return (
        <p className={cn('text-muted-foreground text-sm', className)} {...props}>
            {children}
        </p>
    );
};

export { Header, HeaderSubTitle, HeaderTitle };
