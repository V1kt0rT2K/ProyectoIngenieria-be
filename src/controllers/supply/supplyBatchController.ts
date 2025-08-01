import { Request, Response} from 'express';
import SupplyBatchService from '../../services/supply/supplyBatchService'; 
import { formatRequest } from '../../utils/requestParams';


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
    }
}

export const getSupplyBatchesByIdType = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);

        let idSupplyType = parseInt(params.idSupplyType);

        const result = await SupplyBatchService.getSupplyBatchesByIdType(idSupplyType);

        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}
export const getSuppbyBatchbyMenorExpirationDate = async (req: Request, res: Response) => {
    try {
        const result = await SupplyBatchService.getSuppbyBatchbyMenorExpirationDate();
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}
export const updateStckSupplyBatch = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        const idSupplyBatch = parseInt(params.idSupplyBatch);
        const quantity = parseInt(params.quantity);

        const result = await SupplyBatchService.updateStckSupplyBatch(idSupplyBatch, quantity);
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}

