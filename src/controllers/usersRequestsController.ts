import { Request, Response } from 'express';
import UserRequestService from "../services/userRequestService";
import { formatRequest } from '../utils/requestParams';
import JsonResponse from '../utils/jsonResponse';

export const getAllRequests = async (req: Request, res: Response) => {
    try {
        const result = await UserRequestService.getAllRequests();

        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}

export const getUserRequestsByIdUser = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);

        const result = await UserRequestService.getUserRequestsByIdUser(parseInt(params.idUser));
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}

export const manageUserRequest = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let idUserRequest = parseInt(params.idUserRequest);
        let idStatus = parseInt(params.idStatus);

        const result = await UserRequestService.manageUserRequest(idUserRequest,idStatus);
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}