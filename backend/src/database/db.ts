import mongoose from "mongoose";
import { DATABASE_URL } from "../config";
mongoose.connect(DATABASE_URL);

const userSchema = new mongoose.Schema({
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
})

export const user = mongoose.model('User',userSchema);