import  express, {Express, Request, Response} from 'express';
import UserRolService from "../services/userRolService"
import { formatRequest } from '../utils/requestParams';
import userRolService from '../services/userRolService';

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const result = await UserRolService.getUserRoles();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("ERR");
    }
}

export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        const idUser = parseInt(params.id);

        const result = await userRolService.updateUserRole(idUser, params.newRoleId, params.description);

        console.log('result',result);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(`Error ${err}`);
    }
}

