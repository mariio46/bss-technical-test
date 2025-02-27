import { Button } from '@/components/ui/button';
import { useCreateProduct } from './action';

import { ClientActionSubmitButton } from '@/components/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const CreateProductForm = ({ handleClose }: { handleClose: VoidFunction }) => {
    const { form, submit } = useCreateProduct(handleClose);

    return (
        <Form {...form}>
            <form id='create-product-form' onSubmit={form.handleSubmit(submit)} className='max-w-xl space-y-4'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Name <span className='text-destructive'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    autoFocus
                                    type='text'
                                    autoComplete='name'
                                    aria-label='Name'
                                    placeholder='Your product name'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Price <span className='text-destructive'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    autoComplete='price'
                                    aria-label='Price'
                                    placeholder='e.g. 1000000'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Category <span className='text-destructive'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    autoComplete='type'
                                    aria-label='Type'
                                    placeholder='Product type e.g. Bag or Shoes'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='stock'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Stock <span className='text-destructive'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    autoComplete='stock'
                                    aria-label='Stock'
                                    placeholder='e.g. 10 or 100'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter className='sm:justify-end'>
                    <DialogClose asChild>
                        <Button type='button' tabIndex={-1} variant='secondary'>
                            Close
                        </Button>
                    </DialogClose>
                    <ClientActionSubmitButton
                        form='create-product-form'
                        visibility={form.formState.isSubmitting}
                        disabled={form.formState.isSubmitting || !form.formState.isDirty}
                    />
                </DialogFooter>
            </form>
        </Form>
    );
};

export { CreateProductForm };
