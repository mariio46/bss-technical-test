import { z } from 'zod';

const updateProductSchema = z.object({
    name: z.string().min(1).min(3),
    type: z.string().min(1).min(3),
    price: z.coerce.number().min(10000, 'The price field must be at least Rp 10000').default(10000),
    stock: z.coerce.number().min(1),
});

type UpdateProductFormFields = z.infer<typeof updateProductSchema>;

export { updateProductSchema, type UpdateProductFormFields };
