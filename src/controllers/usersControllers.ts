import express, { Express, Request, Response } from 'express';
import { formatRequest, badRequestMessage } from '../utils/queryHandler';
import UserService from '../services/userService';

const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAll();
        //console.log(result);
        res.json(result);
    }
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }

}

export const loginUser = async (req: Request, res: Response) => {

    try {
        const result = await userService.loginUser(req.body.email, req.body.password);
        res.json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body.user, req.body.person);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(`Error ${err}`);
    }
}

export const getUserRequests = async (req: Request, res: Response) => {
    try {
        const idUser = parseInt(req.params.id);
        const result = await userService.getUserRequests(idUser);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(`Error ${err}`);
    }
}