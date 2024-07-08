"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPharmacyTypes = void 0;
const zod_1 = require("zod");
exports.addPharmacyTypes = zod_1.z.object({
    name: zod_1.z.string().min(3),
    address: zod_1.z.string().min(3),
    mobileno: zod_1.z.number(),
    email: zod_1.z.string().email(),
});
