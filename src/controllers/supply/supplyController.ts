import { Request, Response} from 'express';
import SupplyService from '../../services/supply/supplyService'

export const getAllSupplies = async (req: Request, res: Response) => {
    try {
        const result = await SupplyService.getAll();

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 
}
export const getSupplyById = async (req: Request, res: Response) => {
    try {
        const params = req.params;
        const result = await SupplyService.getById(params.idSupply);   
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}
export const getSupplyByType = async (req: Request, res: Response) => {
    try {
        const params = req.params;
        const result = await SupplyService.getSupplybyType(Number(params.idSupplyType));   
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}
export const getSupplyByStage = async (req: Request, res: Response) => {
    try {
        const params = req.params;
        let idStage = Number(params.idStage);
        const result = await SupplyService.getSuppybyStage(idStage);   
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}