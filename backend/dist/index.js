"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const pharmacy_1 = __importDefault(require("./routes/pharmacy"));
const medicine_1 = __importDefault(require("./routes/medicine"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/pharmacy", pharmacy_1.default);
app.use("/api/v1/medicine", medicine_1.default);
app.listen(3000);
