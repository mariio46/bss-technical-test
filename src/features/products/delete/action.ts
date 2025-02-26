import { useRouter } from 'next/navigation';

import type { AxiosError } from 'axios';

import { useQueryClient } from '@tanstack/react-query';

import { useOpen } from '@/hooks/use-open';
import { axiosClient } from '@/lib/axios';

export const useDeleteProduct = (closeDialog: VoidFunction, source: 'index' | 'show' = 'index') => {
    const { open: loading, handleClose: stopLoading, handleOpen: startLoading } = useOpen();

    const router = useRouter();

    const queryClient = useQueryClient();

    async function handleDelete(id: number) {
        startLoading();
        try {
            await axiosClient.delete(`/api/products/delete/${id}`);
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
