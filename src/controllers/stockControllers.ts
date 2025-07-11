import e, { Request, Response } from 'express';
import JsonResponse from '../utils/jsonResponse';
import stockService from '../services/stockService';


export const getAllswineBatch = async (req: Request, res: Response) => {
    try {
        
        const result = await stockService.getAllSwineBatches();       
        res.status(result.getStatus()).json(result);
    } catch (err) {
        res.status(500).json(JsonResponse.error(500, "Error Interno del Servidor."));
    }
}
export const getSwineBatchByStage = async (req: Request, res: Response) => {
    try {
        const { idStage } = req.params;

        const result = await stockService.getSwineBatchByStage(Number(idStage));

        res.status(result.getStatus()).json(result);
    } catch (err) {
        res.status(500).json(JsonResponse.error(500, "Error Interno del Servidor."));
    }
}
export const getSwineBatchById = async (req: Request, res: Response) => {
    try {
        const { idSwineBatch } = req.params;

        const result = await stockService.getSwineBatchById(Number(idSwineBatch));

        res.status(result.getStatus()).json(result);
    } catch (err) {
        res.status(500).json(JsonResponse.error(500, "Error Interno del Servidor."));
    }

}
export const getSwinesByBatch = async (req: Request, res: Response) => {
    try {
        const { idSwineBatch } = req.params;

        const result = await stockService.getSwinesByBatch(Number(idSwineBatch));

        res.status(result.getStatus()).json(result);
    } catch (err) {
        res.status(500).json(JsonResponse.error(500, "Error Interno del Servidor."));
    }
}