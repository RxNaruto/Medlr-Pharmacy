"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMedicineTypes = void 0;
const zod_1 = require("zod");
exports.addMedicineTypes = zod_1.z.object({
    name: zod_1.z.string().min(3),
    description: zod_1.z.string().min(3),
    price: zod_1.z.number().nonnegative(),
    discount: zod_1.z.number().max(100).nonnegative(),
    quantity: zod_1.z.number(),
    pharmacy: zod_1.z.string()
});
