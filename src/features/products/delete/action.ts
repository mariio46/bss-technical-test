import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import type { Product } from '@/types/api/product';

import { useOpen } from '@/hooks/use-open';
import { axiosClient } from '@/lib/axios';

export const useDeleteProduct = (closeDialog: VoidFunction, product: Product, source: 'index' | 'show' = 'index') => {
    const { open: loading, handleClose: stopLoading, handleOpen: startLoading } = useOpen();

    const router = useRouter();

    const queryClient = useQueryClient();

    async function handleDelete(id: number) {
        startLoading();
        try {
            await axiosClient.delete(`/api/products/delete/${id}`);

            toast('Success', {
                description: `Product with name ${product.name} has been deleted successfully.`,
            });
        } catch (e) {
            const error = e as AxiosError;
            console.error(error);
        } finally {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });

            stopLoading();

            closeDialog();

            if (source === 'show') router.push('/', { scroll: true });
        }
    }

    return { loading, handleDelete };
};
