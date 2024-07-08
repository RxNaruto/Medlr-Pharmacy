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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pharmacy_1 = require("../types/pharmacy");
const pharmacyAuth_1 = require("../middleware/pharmacyAuth");
const db_1 = require("../database/db");
const cache_1 = __importDefault(require("../database/cache"));
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
pharmacyRouter.get('/getallPharma', pharmacyAuth_1.PharmacyAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = 'pharmacies';
    try {
        let pharmacies = cache_1.default.get(cacheKey);
        if (!pharmacies) {
            console.log('Fetching pharmacies from database');
            pharmacies = yield db_1.Pharmacy.find();
            cache_1.default.set(cacheKey, pharmacies, 3600);
        }
        else {
            console.log('Fetching pharmacies from cache');
        }
        return res.status(200).json({
            allPharmacy: pharmacies
        });
    }
    catch (error) {
        console.error('Error fetching pharmacies:', error);
        res.status(500).json({
            message: 'Internal server Error'
        });
    }
}));
pharmacyRouter.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({
            message: "Name query parameter is required"
        });
    }
    try {
        const pharmacies = yield db_1.Pharmacy.find({ name: new RegExp(name, 'i') });
        if (pharmacies.length === 0) {
            return res.status(404).json({
                message: "No pharmacies found with the given name"
            });
        }
        res.status(200).json({
            pharmacies: pharmacies
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
exports.default = pharmacyRouter;
