import { Request, Response, Router } from "express";
import { addMedicineTypes, updateMedicineTypes } from "../types/medicine";
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
interface medicineUpdateBody{
    name: string;
    description: string;
    price: number;
    discount: number;
    quantity: number;
   
}
medicineRouter.put("/update/:id" ,async(req:Request,res: Response)=>{
    const body: medicineUpdateBody = req.body;
    const {id} = req.params;
    const {success} = updateMedicineTypes.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Incorrect details"
        })
    }
   try {
     const newMedicine = await Medicine.findByIdAndUpdate(id,{
        $set: {
            name: body.name,
            description: body.description,
            price: body.price,
            discount: body.discount,
            quantity: body.quantity,
        
        }
    },
    { new: true, runValidators: true })
     return res.status(200).json({
         message: "Medicine updated successfully",
         Medicine: newMedicine
     })
   } catch (error){
    console.log(error);
    return res.status(500).json({
        message: "Internal Server error"
    })
    
   }


})
medicineRouter.delete("/delete/:id" ,async(req:Request,res: Response)=>{
    const {id} = req.params;
   try {
     await Medicine.findByIdAndDelete(id)
     return res.status(200).json({
         message: "Medicine deleted successfully",
        
     })
   } catch (error){
    console.log(error);
    return res.status(500).json({
        message: "Internal Server error"
    })
    
   }


})
medicineRouter.get("/get/:id" , async(req:Request,res: Response)=>{
    const {id} = req.params;
    try {
        const getMedicine = await Medicine.findById(id);
        res.status(200).json({
            medicine: getMedicine
        })
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
        
    }

})

medicineRouter.get("/getall/:id/", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const checkPharmacy = await Pharmacy.findById(id).populate('medicines');
        
        if (!checkPharmacy) {
            return res.status(404).json({
                message: "Pharmacy not found"
            });
        }

        res.status(200).json({
            medicines: checkPharmacy.medicines
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});


export default medicineRouter;