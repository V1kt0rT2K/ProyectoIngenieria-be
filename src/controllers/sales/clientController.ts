import { Request, Response} from 'express';
import { formatRequest, badRequestMessage } from '../../utils/requestParams';
import ClientService from '../../services/sales/clientService';

export const getClientTypes = async (req: Request, res: Response) => {
    try {
        
        const result = await ClientService.getClientTypes();

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}