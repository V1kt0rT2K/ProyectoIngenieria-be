import { Request, response, Response } from 'express';
import AuthService from '../../services/users/authService';
import { formatRequest } from '../../utils/requestParams';
import JsonResponse from '../../utils/jsonResponse';
import {generateToken} from '../../utils/jwtService';


export const loginUser = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);

        const result = await AuthService.loginUser(params.email, params.password);

        if(!result.hasError){

            const token = generateToken(result.data);
            
            res.setHeader("Authorization", `Bearer ${token}`);
        }

        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);

        const result = await AuthService.registerUser(params);

        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}

