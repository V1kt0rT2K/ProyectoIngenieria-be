import { Request, Response } from 'express';
import AuthService from '../services/authService';
import { formatRequest } from '../utils/requestParams';
import JsonResponse from '../utils/jsonResponse';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);

        const result = await AuthService.loginUser(params.email, params.password);

        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}