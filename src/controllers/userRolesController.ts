import  express, {Express, Request, Response} from 'express';
import UserRolService from "../services/userRolService"

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const result = await UserRolService.getUserRoles();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("ERR");
    }
}