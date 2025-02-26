'use client';

import type { Product } from '@/types/api/product';

import { useOpen } from '@/hooks/use-open';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { UpdateProductForm } from './form';

interface UpdateProductDialogProps {
    children: React.ReactNode;
    product: Product;
    source: 'index' | 'show';
}

const UpdateProductDialog = ({ children, product, source = 'index' }: UpdateProductDialogProps) => {
    const { open, setOpen, handleClose } = useOpen();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Product</DialogTitle>
                    <DialogDescription>
                        Modify the product details as needed to keep your inventory up to date. Make sure to save
                        changes after editing.
                    </DialogDescription>
                </DialogHeader>
                <UpdateProductForm handleClose={handleClose} product={product} source={source} />
            </DialogContent>
        </Dialog>
    );
};

export { UpdateProductDialog };
