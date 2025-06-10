import  express, {Express, Request, Response,NextFunction} from 'express';
import { connectDB, disconnectDB, executeQuery } from '../utils/connection';
import {queryResponse} from '../utils/queryResponse';
import {requestParams} from '../utils/requestParams';

const schema: string = 'users.'


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const params = requestParams.fromRequest(req);
        //params.user = await getUserFromToken(req); 
        
        const result = await executeQuery(`${schema}prdGetAll`, params);
        const httpStatus = queryResponse.getHttpStatus(result);
        res.status(httpStatus).send(result);
    } 
    catch (error) {
        console.error('Error al ejecutar consulta:', error);
        return res.status(500).send(queryResponse.error(500, "Error interno del servidor", 4));
    } 

}

export const saveUser = async (req: Request, res: Response) => {
    try {
        const params = requestParams.fromRequest(req);
        //params.user = await getUserFromToken(req); 
        
        const result = await executeQuery(`${schema}prdSaveUser`, params);
        const httpStatus = queryResponse.getHttpStatus(result);
        res.status(httpStatus).send(result);
    } 
    catch (error) {
        console.error('Error al ejecutar consulta:', error);
        return res.status(500).send(queryResponse.error(500, "Error interno del servidor", 4));
    } 

}

