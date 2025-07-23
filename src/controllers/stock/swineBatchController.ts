import { Request, Response} from 'express';
import { formatRequest, badRequestMessage } from '../../utils/requestParams';
import SwineBatchService from '../../services/stock/swineBatchService';


export const getAll = async (req: Request, res: Response) => {
   
    try {
        const result = await SwineBatchService.getAll();

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}

export const getSwineBatchByIdStage = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let idStage = parseInt(params.idStage);

        const result = await SwineBatchService.getSwineBatchByIdStage(idStage);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}

export const getSwineBatchById = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let idSwineBatch = parseInt(params.idSwineBatch);

        const result = await SwineBatchService.getSwineBatchById(idSwineBatch);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}

export const createSwineBatch = async (req: Request, res: Response) => {
    try {

        const params = formatRequest(req);

        const result = await SwineBatchService.createSwineBatch(params);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}









