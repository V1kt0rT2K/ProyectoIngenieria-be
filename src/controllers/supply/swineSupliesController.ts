import { Request, Response} from 'express';
import SwineSupplyService from '../../services/supply/swineSuppliesService';
import { formatRequest, badRequestMessage } from '../../utils/requestParams';
export const getAllSwineSupply = async (req: Request, res: Response) => {
    try {
        const result = await SwineSupplyService.getAllSwineSupply();
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
} 
export const getAllSwineSupplybyidSwineBatch = async (req: Request, res: Response) => {
    try {
        const idSwineBatch = parseInt(req.params.idSwineBatch);
        const result = await SwineSupplyService.getAllSwineSupplybyidSwineBatch(idSwineBatch);
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}  
export const createSwineSupply = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        const result = await SwineSupplyService.createSwineSupply(params);
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}