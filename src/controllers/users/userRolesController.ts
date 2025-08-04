import  express, {Express, Request, Response} from 'express';
import UserRoleService from "../../services/users/userRoleService"
import { formatRequest } from '../../utils/requestParams';
import JsonResponse from '../../utils/jsonResponse';

export const getAllRolesForAdmin = async (req: Request, res: Response) => {
    try {
        const result = await UserRoleService.getUserRolesForAdmin();
        
        res.status(result.getStatus()).json(result);
    } catch (err) {
        res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}

export const updateUserRole = async (req: Request, res: Response) => {
    try {

        const params = formatRequest(req);

        const result = await UserRoleService.updateUserRole(params);
        
        res.status(result.getStatus()).json(result);
    } catch (err) {
        res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}


