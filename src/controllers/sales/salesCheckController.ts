import { Request, Response} from 'express';
import { formatRequest, badRequestMessage } from '../../utils/requestParams';
import SalesCheckService from '../../services/sales/salesCheckService';
import { getUserFromJWT } from '../../utils/jwtService';

export const getAllSalesChecks = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);

        let idClientType = parseInt(params.idClientType);
        let page = parseInt(params.page);
        let size = parseInt(params.size);
        let sort = parseInt(params.sort);
        const result = await SalesCheckService.getAllSalesChecksByClientType(idClientType,page,size,sort);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}

export const getAllSalesChecksForUser = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        const user = await getUserFromJWT(req);

        
        let idClientType = parseInt(params.idClientType);
        let page = parseInt(params.page);
        let size = parseInt(params.size);
        let sort = parseInt(params.sort);

        const result = await SalesCheckService.getAllSalesChecksForUserByClientType(user,idClientType,page,size,sort);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}

export const getSalesCheckById = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);

        let idSalesCheck = parseInt(params.idSalesCheck);
        const result = await SalesCheckService.getSalesCheckById(idSalesCheck);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}

export const generateSalesCheck = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        const user = await getUserFromJWT(req);

        const result = await SalesCheckService.generateSalesCheck(user,params);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 
}