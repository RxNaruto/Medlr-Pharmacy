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
const pharmacy_1 = require("../types/pharmacy");
const pharmacyAuth_1 = require("../middleware/pharmacyAuth");
const db_1 = require("../database/db");
const pharmacyRouter = (0, express_1.Router)();
pharmacyRouter.post("/addPharmacy", pharmacyAuth_1.PharmacyAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = pharmacy_1.addPharmacyTypes.safeParse(body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect details"
        });
    }
    try {
        console.log("adding pharmacy");
        const newPharmacy = yield db_1.Pharmacy.create({
            name: body.name,
            address: body.address,
            mobileno: body.mobileno,
            email: body.email,
            user: req.userId
        });
        const userUpdateResult = yield db_1.User.findByIdAndUpdate(req.userId, {
            $push: { pharmacies: newPharmacy._id }
        });
        if (!userUpdateResult) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "Pharmacy added successfully",
            pharmacy: newPharmacy
        });
    }
    catch (err) {
        console.error("Error adding pharmacy:", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}));
exports.default = pharmacyRouter;
