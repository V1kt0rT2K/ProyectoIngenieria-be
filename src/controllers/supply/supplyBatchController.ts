import { Request, Response} from 'express';
import SupplyBatchService from '../../services/supply/supplyBatchService'; 
export const getAllSupplyBatches = async (req: Request, res: Response) => {
    try {
        const result = await SupplyBatchService.getAllSupplyBatches();
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}
export const getSupplyBatchById = async (req: Request, res: Response) => {
    try {
        const params = req.params;
        const result = await SupplyBatchService.getSupplyBatchById(params.idSupplyBatch);
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }}


