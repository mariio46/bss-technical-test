import * as React from 'react';

import type { FormProps } from 'next/form';

import { cn } from '@/utils';

const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, ...props }, ref) => {
    return (
        <form
            className={cn(
                '[&>[data-slot=form-action]]:mt-6 [&>[data-slot=form-field]]:mb-4 [&>fieldset]:space-y-1',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});

Form.displayName = 'Form';

const FormField = React.forwardRef<HTMLFieldSetElement, React.FieldsetHTMLAttributes<HTMLFieldSetElement>>(
    (props, ref) => {
        return <fieldset data-slot='form-field' ref={ref} {...props} />;
    },
);

FormField.displayName = 'FormField';

const FormAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
    return <div data-slot='form-action' ref={ref} {...props} />;
});

FormAction.displayName = 'FormAction';

export { Form, FormAction, FormField };
