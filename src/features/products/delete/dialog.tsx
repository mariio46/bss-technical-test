import type { Product } from '@/types/api/product';

import { useOpen } from '@/hooks/use-open';
import { useDeleteProduct } from './action';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

import { ClientActionSubmitButton } from '@/components/button';
import { Button } from '@/components/ui/button';
import { formatDateTime, toRupiah } from '@/utils';

interface DeleteProductDialogProps {
    children: React.ReactNode;
    product: Product;
}

const DeleteProductDialog = ({ children, product }: DeleteProductDialogProps) => {
    const { open, setOpen, handleClose } = useOpen();

    const { handleDelete, loading } = useDeleteProduct(handleClose);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        Remove a product from the list permanently. Please confirm before proceeding, as this action
                        cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className='overflow-hidden rounded-md border bg-background'>
                    <Table>
                        <TableBody>
                            <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
                                <TableCell className='bg-muted/50 py-2 font-medium'>Name</TableCell>
                                <TableCell className='py-2'>{product.name}</TableCell>
                            </TableRow>
                            <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
                                <TableCell className='bg-muted/50 py-2 font-medium'>Category</TableCell>
                                <TableCell className='py-2 capitalize'>{product.type}</TableCell>
                            </TableRow>
                            <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
                                <TableCell className='bg-muted/50 py-2 font-medium'>Price</TableCell>
                                <TableCell className='py-2'>{toRupiah(product.price)}</TableCell>
                            </TableRow>
                            <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
                                <TableCell className='bg-muted/50 py-2 font-medium'>Stock</TableCell>
                                <TableCell className='py-2'>{product.stock}</TableCell>
                            </TableRow>
                            <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
                                <TableCell className='bg-muted/50 py-2 font-medium'>Created</TableCell>
                                <TableCell className='py-2'>
                                    {formatDateTime(new Date(product.created_at), 'HH:mm, MMM dd, yyyy')}
                                </TableCell>
                            </TableRow>
                            <TableRow className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'>
                                <TableCell className='bg-muted/50 py-2 font-medium'>Updated</TableCell>
                                <TableCell className='py-2'>
                                    {formatDateTime(new Date(product.updated_at), 'HH:mm, MMM dd, yyyy')}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <DialogFooter className='sm:justify-end'>
                    <DialogClose asChild>
                        <Button type='button' tabIndex={-1} variant='secondary'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <ClientActionSubmitButton
                        onClick={() => handleDelete(product.id)}
                        visibility={loading}
                        disabled={loading}
                        variant='destructive'
                        text='Delete'
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { DeleteProductDialog };
