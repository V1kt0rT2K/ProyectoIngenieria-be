import { Request, Response} from 'express';
import { formatRequest, badRequestMessage } from '../../utils/requestParams';
import SalesCheckService from '../../services/sales/salesCheckService';

export const getAll = async (req: Request, res: Response) => {
    try {
        const result = await SalesCheckService.getAll();

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

        const result = await SalesCheckService.generateSalesCheck(params);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 
}