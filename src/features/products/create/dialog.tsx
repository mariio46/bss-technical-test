'use client';

import { useOpen } from '@/hooks/use-open';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { CreateProductForm } from './form';

interface CreateProductDialogProps {
    children: React.ReactNode;
}

const CreateProductDialog = ({ children }: CreateProductDialogProps) => {
    const { open, setOpen, handleClose } = useOpen();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Product</DialogTitle>
                    <DialogDescription>
                        Fill in the required details to add a new product to the list. Ensure all information is
                        accurate to maintain a well-organized inventory.
                    </DialogDescription>
                </DialogHeader>
                <CreateProductForm handleClose={handleClose} />
            </DialogContent>
        </Dialog>
    );
};

export { CreateProductDialog };
