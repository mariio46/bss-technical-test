import * as React from 'react';

import { cn } from '@/utils';

import { Input } from './input';

interface InputIcon extends React.ComponentProps<'input'> {
    icon: React.ReactNode;
}

const InputIcon = React.forwardRef<HTMLInputElement, InputIcon>(({ className, icon, ...props }, ref) => {
    return (
        <div className='relative w-full'>
            <Input className={cn('peer ps-9', className)} ref={ref} {...props} />
            <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                {icon}
            </div>
        </div>
    );
});

InputIcon.displayName = 'InputIcon';

export { InputIcon };
