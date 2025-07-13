import VaccineBatchService from '../../services/supply/vaccineBatchService';
import { Request, Response } from 'express';
import JsonResponse from '../../utils/jsonResponse';

export const getAll = async (req: Request, res: Response) => {
    try {
    
        const result = await VaccineBatchService.getAll();
        
        res.status(result.getStatus()).json(result);
    } catch (err) {
        res.status(500).json(JsonResponse.error(500, "Error Interno del Servidor."));
    }
}