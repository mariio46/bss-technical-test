import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { Product } from '@/types/api/product';

import { axiosClient } from '@/lib/axios';
import { createProductSchema, type CreateProductFormFields } from './schema';

type CreateProductError = {
    name: string[];
    price: string[];
    type: string[];
    stock: string[];
};

export const useCreateProduct = (handleClose: VoidFunction) => {
    const queryClient = useQueryClient();

    const form = useForm<CreateProductFormFields>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: '',
            price: 1000,
            stock: 0,
            type: '',
        },
    });

    async function submit(values: CreateProductFormFields) {
        try {
            const { data } = await axiosClient.post<{ product: Product }>('/api/products/create', values);

            form.reset();

            toast('Success', {
                description: `Product with name ${data.product.name} has been created successfully.`,
            });
        } catch (e) {
            const error = e as AxiosError<{ errors: CreateProductError }>;

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

            handleClose();
        }
    }

    return { form, submit };
};
