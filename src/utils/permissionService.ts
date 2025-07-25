import { Request, Response, NextFunction } from "express";
import JsonResponse from './jsonResponse';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const checkUserAction = (req: Request, res: Response, next: NextFunction) =>{

    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json(JsonResponse.error(401,"Autorización no proveida."));
    }

    const decodedToken = jwt.decode(token,{json:true});
    const actionName = req.route.stack.at(-1).name;

    console.log("email: ",decodedToken?.email, "actionName: ",actionName);

    next();

    // if(decodedToken?.email == 'viktor.hernandez@gmail.com'){
    //     next();
    // }else{
    //     return res.status(403).json(JsonResponse.error(403,"Acceso no Autorizado"));
    // }
    
}