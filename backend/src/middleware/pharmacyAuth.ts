import { NextFunction, Request,Response } from "express";
import  jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { CustomRequest } from "../types/CustomRequest";

interface DecodedToken{
    userId: string
}

export const PharmacyAuth=(req: CustomRequest,res: Response,next: NextFunction)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(404).json({
            message: "You are not authorized"
        })
    }
    try{
        const decoded : any = jwt.verify(token,JWT_SECRET) as DecodedToken;
        req.userId = decoded.userId;
        next();

    }catch(e){
        return res.status(403).json({ message: "Invalid token" });
    }

}