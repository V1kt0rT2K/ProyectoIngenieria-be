import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { Request, Response, NextFunction } from "express";
import JsonResponse from './jsonResponse';

export const generateToken = (payload:any) =>{

    const token = jwt.sign({
            idUser: payload.idUser ,
            email: payload.email
        }, SECRET_KEY, {
            expiresIn:"2400s"
        });
            
    return token;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json(JsonResponse.error(401,"Autorización no proveida."));
    }
    try {
        const payload = jwt.verify(token, SECRET_KEY);

        next();
    } catch (error) {
        return res.status(403).json(JsonResponse.error(403,"Autorización inválida."));
    }
}

export const verifyTokenTest = (req: Request, res: Response, next: NextFunction) =>{
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).json(JsonResponse.error(401,"Autorización no proveida."));
    }
    try {
        const payload = jwt.verify(token, SECRET_KEY);

        

        return res.status(200).json(JsonResponse.success(payload,"Acceso verificado con éxito."));
        //next();
    } catch (error) {
        return res.status(403).json(JsonResponse.error(403,"Autorización inválida."));
    }
}