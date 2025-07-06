import { Request, Response } from 'express';
import UserRequestService from "../services/userRequestService";
import { formatRequest } from '../utils/requestParams';

export const getAllRequests = async (req: Request, res: Response) => {
    try {
        const result = await UserRequestService.getAllRequests();
        res.status(result.getStatus()).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getUserRequestsByIdUser = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);

        const result = await UserRequestService.getUserRequestsByIdUser(parseInt(params.idUser));
        res.status(result.getStatus()).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}