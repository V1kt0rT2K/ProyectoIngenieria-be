import ProductBatchService from "../../services/stock/productBatchService";
import { formatRequest } from '../../utils/requestParams';
import { Request, Response } from "express";


export const getAllProductBatches = async (req: Request, res: Response) => {
    try {
        const result = await ProductBatchService.getAll();
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al obtener lotes de productos:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
};
export const createProductBatch = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        const result = await ProductBatchService.createProductBatch(params);
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al crear lote de producto:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}