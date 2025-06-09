import  express, {Express, Request, Response,NextFunction} from 'express';
import { connectDB, disconnectDB, executeQuery } from './connection';
import {queryResponse} from './queryResponse';
import {requestParams} from './requestParams';


const index = express.Router();

index.use("/test/:id",
    async (req: Request, res: Response) => {
    try {
        const params = requestParams.fromRequest(req);
        //params.user = await getUserFromToken(req); 
        
        const result = await executeQuery(`prdPrueba`, params);
        const httpStatus = queryResponse.getHttpStatus(result);
        res.status(httpStatus).send(result);
    } 
    catch (error) {
        console.error('Error al ejecutar consulta:', error);
        return res.status(500).send(queryResponse.error(500, "Error interno del servidor", 4));
    } 

});

index.use("/test",
    async (req: Request, res: Response) => {
    try {
        const params = requestParams.fromRequest(req);
        //params.user = await getUserFromToken(req); 
        
        const result = await executeQuery(`prdInsercion`, params);
        const httpStatus = queryResponse.getHttpStatus(result);
        res.status(httpStatus).send(result);
    } 
    catch (error) {
        console.error('Error al ejecutar consulta:', error);
        return res.status(500).send(queryResponse.error(500, "Error interno del servidor", 4));
    } 

});

index.use("/get/all",
    async (req: Request, res: Response) => {
    try {
        const params = requestParams.fromRequest(req);
        //params.user = await getUserFromToken(req); 
        
        const result = await executeQuery(`prdGetAll`, params);
        const httpStatus = queryResponse.getHttpStatus(result);
        res.status(httpStatus).send(result);
    } 
    catch (error) {
        console.error('Error al ejecutar consulta:', error);
        return res.status(500).send(queryResponse.error(500, "Error interno del servidor", 4));
    } 

});


export default index;