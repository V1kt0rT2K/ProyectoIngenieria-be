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

        if (!result.isEnabled) {
            res.status(401).send("Usuario no habilitado");
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

export const putIsEnabled = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.body.id);
        const enabled = req.body.enabled;

        const result = UserService.putisEnabled(id, enabled);

        if (!result) {
            res.status(500).json({ msg: 'Usuario no encontrado.' });
            return;
        }

        res.status(200).json({ msg: 'Usuario habilitado' });
    } catch (err) {
        res.status(500).send(`Error ${err}`);
    }
}