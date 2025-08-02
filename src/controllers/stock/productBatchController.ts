import ProductBatchService from "../../services/stock/productBatchService";
import { formatRequest } from '../../utils/requestParams';
import { Request, Response } from "express";


export const getAllProductBatches = async (req: Request, res: Response) => {
   const params = formatRequest(req);
    let page = parseInt(params.page);
    let size = parseInt(params.size);
    let sort = parseInt(params.sort);
    try {
        const result = await ProductBatchService.getAllProductBatch(page, size, sort);
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