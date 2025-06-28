import { Request, Response } from 'express';
import UserService from '../services/userService';

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
        const result = await UserService.loginUser(req.body.email, req.body.password);

        if (result === null) {
            res.status(400).send("Credenciales no validas");
            return;
        }

        res.status(200).json(result);
    } catch (error) {
        return res.status(500).send("Error de servidor");
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const result = await UserService.registerUser(req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(`Error ${err}`);
    }
}

export const getUserRequests = async (req: Request, res: Response) => {
    try {
        const idUser = parseInt(req.params.id);
        const result = await UserService.getUserRequests(idUser);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(`Error ${err}`);
    }
}


export const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const { idUser } = req.params;  
        const { isEnabled } = req.body; 

        if (typeof isEnabled !== 'boolean') {
            return res.status(400).json({ message: 'El campo isEnabled debe ser booleano' });
        }

        const user = await UserService.updateUserStatus(Number(idUser), isEnabled);

        return res.status(200).json({ message: 'Estado actualizado correctamente', user });
    } catch (err) {
        res.status(500).send(`Error ${err}`);
    }
};