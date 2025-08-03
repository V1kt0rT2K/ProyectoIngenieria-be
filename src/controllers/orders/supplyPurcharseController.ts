import { Request, Response} from 'express';
import SupplyPurcharseService from '../../services/orders/supplyPurcharseService';
import { formatRequest } from '../../utils/requestParams';
import { getUserFromJWT } from '../../utils/jwtService';

export const getAllSupplyPurcharses = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let page = parseInt(params.page);
        let size = parseInt(params.size);
        let sort = parseInt(params.sort);

        const result = await SupplyPurcharseService.getAllSupplyPurcharses(page,size,sort);
        
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}

export const getAllSupplyPurcharsesByIdStatus = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let page = parseInt(params.page);
        let size = parseInt(params.size);
        let sort = parseInt(params.sort);
        let idStatus = parseInt(params.idStatus);

        const result = await SupplyPurcharseService.getAllSupplyPurcharsesByIdStatus(page,size,sort,idStatus);
        
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}

export const getSupplyPurcharseById = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let idSupplyPurcharse = parseInt(params.idSupplyPurcharse);
        

        const result = await SupplyPurcharseService.getSupplyPurcharseById(idSupplyPurcharse);
        
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}

export const generatePurcharse = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        const user =  await getUserFromJWT(req);
        
        const result = await SupplyPurcharseService.generatePurcharse(user,params);

        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}

export const enterSupplyPurcharse = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        const user =  await getUserFromJWT(req);
        
        const result = await SupplyPurcharseService.enterSupplyPurcharse(user,params);
        
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}

export const updatePurcharseStatus = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let idSupplyPurcharse = parseInt(params.idSupplyPurcharse);
        let idStatus = parseInt(params.idStatus);
        
        const result = await SupplyPurcharseService.updatePurcharseStatus(idSupplyPurcharse,idStatus);
        
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}

export const approveOrRejectSupplyPurcharse = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let idSupplyPurcharse = parseInt(params.idSupplyPurcharse);
        let idStatus = parseInt(params.idStatus);
        
        const result = await SupplyPurcharseService.approveOrRejectSupplyPurcharse(idSupplyPurcharse,idStatus);
        
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}