import { Request, Response } from 'express';
import UserRequestService from "../services/userRequestService";

export const getAllRequests = async (req: Request, res: Response) => {
    try {
        const result = await UserRequestService.getAllRequests();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}