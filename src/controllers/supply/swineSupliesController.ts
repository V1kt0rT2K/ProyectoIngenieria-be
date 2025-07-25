import { Request, Response} from 'express';
import SwineSupplyService from '../../services/supply/swineSuppliesService';
export const getAllSwineSupply = async (req: Request, res: Response) => {
    try {
        const result = await SwineSupplyService.getAllSwineSupply();
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}   