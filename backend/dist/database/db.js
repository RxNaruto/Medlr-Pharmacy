"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
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
    }
});
exports.user = mongoose_1.default.model('User', userSchema);
