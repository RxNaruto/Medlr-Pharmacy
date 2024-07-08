import {z} from 'zod';

export const addMedicineTypes = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    price: z.number().nonnegative(),
    discount: z.number().max(100).nonnegative(),
    quantity: z.number(),
    pharmacy: z.string()
    


})
export const updateMedicineTypes = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    price: z.number().nonnegative(),
    discount: z.number().max(100).nonnegative(),
    quantity: z.number(),
  
    


})


