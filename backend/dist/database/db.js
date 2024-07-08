"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medicine = exports.Pharmacy = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
mongoose_1.default.connect(config_1.DATABASE_URL);
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    pharmacies: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Pharmacy'
        }]
});
const pharmacySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    address: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    mobileno: {
        type: Number,
        required: true,
        length: 10
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medicines: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Medicine'
        }]
});
const medicineSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 200
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 100
    },
    quantity: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: false,
        trim: true
    },
    pharmacy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Pharmacy',
    }
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Pharmacy = mongoose_1.default.model('Pharmacy', pharmacySchema);
exports.Medicine = mongoose_1.default.model('Medicine', medicineSchema);
