import { Request, Response} from 'express';
import ProviderService from '../../services/orders/providerService';
import { formatRequest } from '../../utils/requestParams';
import { getUserFromJWT } from '../../utils/jwtService';

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
        const user = await getUserFromJWT(req);
        
        const result = await ProviderService.registerProvider(user,params);
        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 
}