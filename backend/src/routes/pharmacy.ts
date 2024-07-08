import { Response, Router } from "express";
import { addPharmacyTypes } from "../types/pharmacy";
import { PharmacyAuth } from "../middleware/pharmacyAuth";
import { Pharmacy, User } from "../database/db";
import { CustomRequest } from "../types/CustomRequest";

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

export default pharmacyRouter;
