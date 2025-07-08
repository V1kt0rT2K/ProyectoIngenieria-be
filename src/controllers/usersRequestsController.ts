import { Request, Response } from 'express';
import UserRequestService from "../services/userRequestService";
import { formatRequest } from '../utils/requestParams';
import JsonResponse from '../utils/jsonResponse';

export const getAllRequests = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let page = parseInt(params.page);
        let size = parseInt(params.size);
        let sort = parseInt(params.sort);

        const result = await UserRequestService.getAllRequests(page,size,sort);

        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}

export const getUserRequestsByIdUser = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let idUser = parseInt(params.idUser);

        const result = await UserRequestService.getUserRequestsByIdUser(idUser);
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}

export const getUserRequestById = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let idUserRequest = parseInt(params.idUserRequest);

        const result = await UserRequestService.getUserRequestById(idUserRequest);
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}

export const getUserRequestsByIdStatus = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let idStatus = parseInt(params.idStatus);
        let page = parseInt(params.page);
        let size = parseInt(params.size);
        let sort = parseInt(params.sort);

        const result = await UserRequestService.getUserRequestsByIdStatus(idStatus,page,size,sort);
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