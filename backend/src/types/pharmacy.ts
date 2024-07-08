import {z} from 'zod';

export const addPharmacyTypes = z.object({
    name: z.string().min(3),
    address: z.string().min(3),
    mobileno: z.number(),
    email:z.string().email(),

})

