import { Request, Response } from 'express';
import JsonResponse from '../utils/jsonResponse';
import SupplyService from '../services/supplyService';

export const getAllFeedBatches = async (req: Request, res: Response) => {
    try {
        const supplyService = new SupplyService();
        const result = await supplyService.getAllFeed();
        
        res.status(result.getStatus()).json(result);
    } catch (err) {
        res.status(500).json(JsonResponse.error(500, "Error Interno del Servidor."));
    }
}
export const getAllVaccineBatches = async (req: Request, res: Response) => {
    try {
        const supplyService = new SupplyService();
        const result = await supplyService.getAllVaccine();
        
        res.status(result.getStatus()).json(result);
    } catch (err) {
        res.status(500).json(JsonResponse.error(500, "Error Interno del Servidor."));
    }
}
export const getBatchesByType = async (req: Request, res: Response) => {
    try {
        const { type } = req.params;

        const supplyService = new SupplyService();
        const result = await supplyService.getByType(type);

        res.status(result.getStatus()).json(result);
    } catch (err) {
        res.status(500).json(JsonResponse.error(500, "Error Interno del Servidor."));
    }
};