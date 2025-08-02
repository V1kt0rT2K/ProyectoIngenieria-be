import { Request, Response} from 'express';
import SupplyBatchService from '../../services/supply/supplyBatchService'; 
import { formatRequest } from '../../utils/requestParams';


export const getAllSupplyBatches = async (req: Request, res: Response) => {
    const params = formatRequest(req);
    let page = parseInt(params.page);
    let size = parseInt(params.size);
    let sort = parseInt(params.sort);
    try {
        const result = await SupplyBatchService.getAllSupplyBatches(page, size, sort);
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
        let page = parseInt(params.page);
        let size = parseInt(params.size);
        let sort = parseInt(params.sort);

        const result = await SupplyBatchService.getSupplyBatchesByIdType(idSupplyType, page, size, sort);

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
export const searchSupplyBatch = async (req: Request, res: Response) => {
    const params = formatRequest(req);
    let searchParam = params.searchParam;
    let page = parseInt(params.page);
    let size = parseInt(params.size);
    let sort = parseInt(params.sort);
    try {
        const result = await SupplyBatchService.searchSupplyBatch(searchParam, page, size, sort);
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }

}
export const searchSupplyBatchByType = async (req: Request, res: Response) => {
    const params = formatRequest(req);
    let idSupplyType = parseInt(params.idSupplyType);
    let searchParam = params.searchParam;
    let page = parseInt(params.page);
    let size = parseInt(params.size);
    let sort = parseInt(params.sort);
    try {
        const result = await SupplyBatchService.searchSupplyBatchByType(idSupplyType,searchParam, page, size, sort);
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }

}


