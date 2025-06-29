import { Request, Response } from 'express';
import UserService from '../services/userService';
import { formatRequest } from '../utils/requestParams';
import User from '../models/userModel';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getAll();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export const loginUser = async (req: Request, res: Response) => {

    try {
        const params = formatRequest(req);

        const result = await UserService.loginUser(params.email, params.password);

        // if (!result.isEnabled) {
        //     res.status(401).send("Usuario no habilitado");
        //     return;
        // }

        res.status(result.meta.status).send(result);
    } catch (error) {
        return res.status(500).send("Error de servidor");
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);

        const result = await UserService.registerUser(params);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(`Error ${err}`);
    }
}

export const getUserRequests = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);

        const idUser = parseInt(params.id);
        const result = await UserService.getUserRequests(idUser);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(`Error ${err}`);
    }
}

export const putIsEnabled = async (req: Request, res: Response)  => {
    try {
        const params = formatRequest(req);
        
        const idUser = parseInt(params.id);
        const enabled = params.enabled;
        const status = params.status;

        const result = await UserService.putIsEnabled(idUser, enabled, status);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(`Error ${err}`);
    }
}

// export const putIsEnabled = async (req: Request, res: Response) => {
//     try {

//         const params = formatRequest(req);

//         if (typeof params.isEnabled !== 'boolean') {
//             return res.status(400).json({ message: 'El campo isEnabled debe ser booleano' });
//         }

//         const user = await UserService.updateUserStatus(params.idUser, params.isEnabled);

//         return res.status(200).json({ message: 'Estado actualizado correctamente', user });
//     } catch (err) {
//         res.status(500).send(`Error ${err}`);
//     }
// }

export const updateUser = async (req: Request, res: Response)  => {
    try {
        const params = formatRequest(req);
        const idUser = parseInt(params.id);

        const result = UserService.updateUser(idUser, params);
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(`Error ${err}`);
    }
}