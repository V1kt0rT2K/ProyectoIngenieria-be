import  express, {Express, Request, Response} from 'express';
import UserRoleService from "../../services/users/userRoleService"
import { formatRequest } from '../../utils/requestParams';
import userRolService from '../../services/users/userRoleService';
import JsonResponse from '../../utils/jsonResponse';

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const result = await UserRoleService.getUserRoles();
        
        res.status(result.getStatus()).json(result);
    } catch (err) {
        res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}

export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        const idUser = parseInt(params.id);

        const result = await userRolService.updateUserRole(idUser, params.newRoleId, params.description);

        res.status(result.getStatus()).json(result);
    } catch (err) {
        res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}

