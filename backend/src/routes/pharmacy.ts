import { Request, Response, Router } from "express";
import { addPharmacyTypes } from "../types/pharmacy";
import { PharmacyAuth } from "../middleware/pharmacyAuth";
import { Pharmacy, User } from "../database/db";
import { CustomRequest } from "../types/CustomRequest";
import cache from "../database/cache";

const pharmacyRouter = Router();

interface addPharmacyBody {
    name: String;
    address: String;
    mobileno: Number;
    email: String;
}

pharmacyRouter.post("/addPharmacy", PharmacyAuth, async (req: CustomRequest, res: Response) => {
    const body: addPharmacyBody = req.body;

    const { success } = addPharmacyTypes.safeParse(body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect details"
        });
    }

    try {
        console.log("adding pharmacy");
        const newPharmacy = await Pharmacy.create({
            name: body.name,
            address: body.address,
            mobileno: body.mobileno,
            email: body.email,
            user: req.userId
        });

    
        const userUpdateResult = await User.findByIdAndUpdate(req.userId, {
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
    } catch (err) {
        console.error("Error adding pharmacy:", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

pharmacyRouter.get('/getallPharma', PharmacyAuth ,async(req,res)=>{
    const cacheKey = 'pharmacies';

    try {

        let pharmacies = cache.get(cacheKey);

        if (!pharmacies) {
            console.log('Fetching pharmacies from database');


            pharmacies = await Pharmacy.find();

 
            cache.set(cacheKey, pharmacies, 3600);
        } else {
            console.log('Fetching pharmacies from cache');
        }

        return res.status(200).json({
            allPharmacy: pharmacies
        });
    } catch (error) {
        console.error('Error fetching pharmacies:', error);
        res.status(500).json({
            message: 'Internal server Error'
        });
    }

});

pharmacyRouter.get("/search", async(req: Request,res: Response) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({
            message: "Name query parameter is required"
        });
    }

    try {
        const pharmacies = await Pharmacy.find({ name: new RegExp(name as string, 'i') });
        if (pharmacies.length === 0) {
            return res.status(404).json({
                message: "No pharmacies found with the given name"
            });
        }
        res.status(200).json({
            pharmacies: pharmacies
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

export default pharmacyRouter;
