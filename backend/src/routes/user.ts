import { Router } from "express";
import { signupTypes,loginTypes } from "../types/user";
import jwt from "jsonwebtoken"
import { JWT_SECRET, password } from "../config";
import { user} from "../database/db";
import { comparePassword, hashPassword } from "../types/hashing";
const userRouter = Router();

interface signupBody{
    username: string;
    password: string;
    name: string;
}
userRouter.post("/signup",async(req,res)=>{
    const body: signupBody = req.body;
    const {success} = signupTypes.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Incorrect details"
        })

    }
    const existingUser = await user.findOne({
        username: req.body.username
    })
        
    if(existingUser){
         return res.status(403).json({
            message: "user already exist"
         })
    }

    try {
        const hashedPassword = await hashPassword(body.password);
        
        const newUser = await user.create({
          
            username: body.username,
            password: hashedPassword,
            name: body.name
            
        })
        
        if(newUser){
           
            const token = jwt.sign({userId: newUser.id},JWT_SECRET)
            res.status(200).json({
                message: "Signup complete",
                token: token
            })
        }
        else{
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

interface loginBody{
    username: string;
    password: string;
}
userRouter.post("/login",async(req,res)=>{
    const body: loginBody = req.body;
    const {success} = loginTypes.safeParse(body);
    if(!success){
        return res.status(403).json({
            message: "Incorrect details"
        })

    }
    try {
        const eUser = await user.findOne({
            username: body.username,
           
        })
        if (!eUser) {
            return res.status(404).json({
                message: "User not found"
            });
          }
        const hashPassword = await comparePassword(body.password,eUser.password);
        if (!hashPassword) {
            return res.status(401).json({
                message: "Invalid credentails"
            });
          }
       
        else{
            const token = jwt.sign({userId: eUser.id},JWT_SECRET)
            res.status(200).json({
                message: "Signin complete",
                token: token
            })
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})


export default userRouter;