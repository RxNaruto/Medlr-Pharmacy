import { Request, Response, Router } from "express";
import { addMedicineTypes } from "../types/medicine";
import { Medicine, Pharmacy } from "../database/db";

const medicineRouter = Router();
interface medicineBody{
    name: string;
    description: string;
    price: number;
    discount: number;
    quantity: number;
    pharmacy: string;

}

medicineRouter.post("/addMedicine" ,async(req:Request,res: Response)=>{
    const body: medicineBody = req.body;
    const {success} = addMedicineTypes.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Incorrect details"
        })
    }
   try {
     const newMedicine = await Medicine.create({
         name: body.name,
         description: body.description,
         price: body.price,
         discount:  body.discount, 
         quantity:  body.quantity,
        
 
     })
     const updatePharmacy = await Pharmacy.findByIdAndUpdate(body.pharmacy, {
        $push: { medicines: newMedicine }
    });

    if (!updatePharmacy) {
        return res.status(404).json({
            message: "medicines was not updated in pharmacy data"
        });
    }

     return res.status(200).json({
         message: "Medicine added successfully",
         Medicine: newMedicine
     })
   } catch (error){
    console.log(error);
    return res.status(500).json({
        message: "Internal Server error"
    })
    
   }


})


export default medicineRouter;