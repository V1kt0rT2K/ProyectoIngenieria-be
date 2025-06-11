import  express, {Express, Request, Response} from 'express';
import { executeProcedure  } from '../utils/connection';
import { formatRequest, badRequestMessage } from '../utils/queryHandler';


const schema: string = 'users.';


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        
        const result = await executeProcedure(`${schema}prdGetAll`, params);
        console.log("result", result);
        const httpStatus = result.meta[0].status;
        res.status(httpStatus).send(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send(badRequestMessage());
    } 

}

export const saveUser = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        
        const result = await executeProcedure(`${schema}prdSaveUser`, params);
        const httpStatus = result.meta[0].status;
        res.status(httpStatus).send(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send(badRequestMessage());
    } 

}

