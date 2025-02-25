import * as React from 'react';

import { cn } from '@/utils';

const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return <div className={cn('mx-auto max-w-5xl px-4 xl:px-0', className)} ref={ref} {...props} />;
    },
);

Container.displayName = 'Container';

export { Container };
