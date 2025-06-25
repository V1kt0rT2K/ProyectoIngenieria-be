import  express, {Express, Request, Response} from 'express';
import { formatRequest, badRequestMessage } from '../utils/queryHandler';
import StatusService from '../services/statusService';

const statusService = new StatusService();

export const getAllStatus = async (req: Request, res: Response) => {
    try {
        const result = await statusService.getAll();
        //console.log(result);
        res.json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}



