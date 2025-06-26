import  express, {Express, Request, Response} from 'express';
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

    try{
        const result= await userService.loginUser(req.body.email, req.body.password);
        res.json(result);
    }catch (error) {
    console.error('Error al ejecutar procedimiento:', error);
    return res.status(500).send('Error Interno del Servidor');
    }
    

}



