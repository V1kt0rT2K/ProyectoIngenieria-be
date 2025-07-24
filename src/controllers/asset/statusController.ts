import { Request, Response} from 'express';
import { formatRequest, badRequestMessage } from '../../utils/requestParams';
import StatusService from '../../services/asset/statusService';

export const getAllStatus = async (req: Request, res: Response) => {
    try {
        const result = await StatusService.getAll();

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}

export const getStatusByIdStatusType = async (req: Request, res: Response) => {
    try {

        const params = formatRequest(req);

        let idStatusType = parseInt(params.idStatusType)

        const result = await StatusService.getStatusByIdStatusType(idStatusType);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}




