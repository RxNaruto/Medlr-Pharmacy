"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicine_1 = require("../types/medicine");
const db_1 = require("../database/db");
const pharmacyAuth_1 = require("../middleware/pharmacyAuth");
const medicineRouter = (0, express_1.Router)();
medicineRouter.post("/addMedicine", pharmacyAuth_1.PharmacyAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = medicine_1.addMedicineTypes.safeParse(body);
    if (!success) {
        return res.status(403).json({
            message: "Incorrect details"
        });
    }
    try {
        const newMedicine = yield db_1.Medicine.create({
            name: body.name,
            description: body.description,
            price: body.price,
            discount: body.discount,
            quantity: body.quantity,
        });
        const updatePharmacy = yield db_1.Pharmacy.findByIdAndUpdate(body.pharmacy, {
            $push: { medicines: newMedicine }
        });
        if (!updatePharmacy) {
            return res.status(404).json({
                message: "medicines was not updated in pharmacy data"
            });
        }
        return res.status(200).json({
            message: "Medicine added successfully",
            Medicine: newMedicine
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}));
medicineRouter.put("/update/:id", pharmacyAuth_1.PharmacyAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.params;
    const { success } = medicine_1.updateMedicineTypes.safeParse(body);
    if (!success) {
        return res.status(403).json({
            message: "Incorrect details"
        });
    }
    try {
        const newMedicine = yield db_1.Medicine.findByIdAndUpdate(id, {
            $set: {
                name: body.name,
                description: body.description,
                price: body.price,
                discount: body.discount,
                quantity: body.quantity,
            }
        }, { new: true, runValidators: true });
        return res.status(200).json({
            message: "Medicine updated successfully",
            Medicine: newMedicine
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}));
medicineRouter.delete("/delete/:id", pharmacyAuth_1.PharmacyAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.Medicine.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Medicine deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}));
medicineRouter.get("/get/:id", pharmacyAuth_1.PharmacyAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getMedicine = yield db_1.Medicine.findById(id);
        res.status(200).json({
            medicine: getMedicine
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
medicineRouter.get("/getall/:id/", pharmacyAuth_1.PharmacyAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkPharmacy = yield db_1.Pharmacy.findById(id).populate('medicines');
        if (!checkPharmacy) {
            return res.status(404).json({
                message: "Pharmacy not found"
            });
        }
        res.status(200).json({
            medicines: checkPharmacy.medicines
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
exports.default = medicineRouter;
