'use client';

import * as React from 'react';

import { TriangleAlert } from 'lucide-react';

import { ServerActionSubmitButton } from '@/components/button';
import { Form, FormAction, FormField } from '@/components/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { InputError } from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';

import { login } from './action';

const LoginForm = () => {
    const [state, action] = React.useActionState(login, null);

    return (
        <>
            {state?.error && state?.error.message && (
                <Alert variant='destructive' className='mb-6'>
                    <TriangleAlert className='size-4' />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state?.error.message}</AlertDescription>
                </Alert>
            )}

            <Form action={action}>
                <FormField>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        type='email'
                        name='email'
                        autoFocus
                        placeholder='m@example.com'
                        autoComplete='email'
                        aria-label='Email'
                    />
                    <InputError message={state?.error.email?.toString()} />
                </FormField>

                <FormField>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        id='password'
                        type='password'
                        name='password'
                        placeholder='********'
                        autoComplete='password'
                        aria-label='Password'
                    />
                    <InputError message={state?.error.password?.toString()} />
                </FormField>

                <FormAction>
                    <ServerActionSubmitButton text='Login' />
                </FormAction>
            </Form>
        </>
    );
};

export { LoginForm };
