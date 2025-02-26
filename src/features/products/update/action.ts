import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { Product } from '@/types/api/product';

import { axiosClient } from '@/lib/axios';
import { updateProductSchema, type UpdateProductFormFields } from './schema';

type UpdateProductError = {
    name: string[];
    price: string[];
    type: string[];
    stock: string[];
};

export const useUpdateProduct = (handleClose: VoidFunction, product: Product, source: 'index' | 'show' = 'index') => {
    const router = useRouter();

    const queryClient = useQueryClient();

    const form = useForm<UpdateProductFormFields>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name: '',
            price: 0,
            stock: 0,
            type: '',
        },
        values: {
            name: product.name,
            price: Number(product.price),
            type: product.type,
            stock: Number(product.stock),
        },
    });

    async function submit(values: UpdateProductFormFields) {
        try {
            const { data } = await axiosClient.patch<{ product: Product }>(
                `/api/products/update/${product.id}`,
                values,
            );

            form.reset({
                name: data.product.name,
                price: Number(data.product.price),
                stock: Number(data.product.stock),
                type: data.product.type,
            });

            toast('Success', {
                description: `Product with name ${data.product.name} has been updated successfully.`,
            });

            handleClose();
        } catch (e) {
            const error = e as AxiosError<{ errors: UpdateProductError }>;

            if (error.status === 422 && error.response) {
                const { errors } = error.response.data;

                if (errors.name) {
                    form.setError('name', { message: errors.name[0] });
                }

                if (errors.type) {
                    form.setError('type', { message: errors.type[0] });
                }

                if (errors.stock) {
                    form.setError('stock', { message: errors.stock[0] });
                }

                if (errors.price) {
                    form.setError('price', { message: errors.price[0] });
                }
            } else {
                console.error(error);
            }
        } finally {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });

            if (source === 'show') router.push('/', { scroll: true });
        }
    }

    return { form, submit };
};
