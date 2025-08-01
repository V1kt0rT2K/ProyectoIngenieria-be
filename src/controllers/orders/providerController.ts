import { Request, Response} from 'express';
import ProviderService from '../../services/orders/providerService';
import { formatRequest } from '../../utils/requestParams';
import { getUserFromJWT } from '../../utils/jwtService';
import JsonResponse from '../../utils/jsonResponse';

export const getAllProviders = async (req: Request, res: Response) => {
    try {
        const result = await ProviderService.getAllProvider();
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}

export const registerProvider = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        
        const result = await ProviderService.registerProvider(params);
        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 
}

export const getProviderById = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let idProvider = parseInt(params.idProvider);

        const result = await ProviderService.getProviderById(idProvider);
        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}

export const updateProvider = async (req: Request, res: Response)  => {
    try {
        const params = formatRequest(req);
        const idProvider = parseInt(params.idProvider);

        const result = await ProviderService.updateProvider(idProvider, params.values);
        
        res.status(result.getStatus()).json(result.data);
    } catch (err) {
        console.log(err);
        res.status(500).json(JsonResponse.error(500,"Error Interno del Servidor."));
    }
}

export const deleteProvider = async ( req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        const idProvider = parseInt(params.idProvider);

        const result = await ProviderService.deleteProvider(idProvider);
        res.status(result.getStatus()).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(JsonResponse.error(500, "Error interno del servidor."));
    }
}