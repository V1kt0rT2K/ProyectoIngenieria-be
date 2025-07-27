import ProductBatchService from "../../services/stock/productBatchService";
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