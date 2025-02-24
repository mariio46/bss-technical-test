import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1),
    // callbackUrl: z.string().nullish().default(''),
});

export { loginSchema };
