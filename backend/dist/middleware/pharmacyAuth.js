"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacyAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const PharmacyAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(404).json({
            message: "You are not authorized"
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (e) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
exports.PharmacyAuth = PharmacyAuth;
