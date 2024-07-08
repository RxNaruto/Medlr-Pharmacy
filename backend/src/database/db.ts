import mongoose, { Mongoose } from "mongoose";
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
    },
    pharmacies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacy'
    }]
});

const pharmacySchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medicines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine'
    }]
});

const medicineSchema = new mongoose.Schema({

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacy',
        
    }
})

export const User = mongoose.model('User', userSchema);
export const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);
export const Medicine = mongoose.model('Medicine',medicineSchema)
