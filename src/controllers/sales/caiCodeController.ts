import { Request, Response} from 'express';
import { formatRequest, badRequestMessage } from '../../utils/requestParams';
import CaiCodeService from '../../services/sales/caiCodeService';

export const generateNewRange = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let idCaiCode = parseInt(params.idCaiCode)
        
        const result = await CaiCodeService.generateNewRange(idCaiCode);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}

export const getAllRangesByActiveStatus = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        
        let isActive = parseInt(params.isActive);
        let page = parseInt(params.page);
        let size = parseInt(params.size);
        let sort = parseInt(params.sort);

        const result = await CaiCodeService.getAllRangesByActiveStatus(isActive,page,size,sort);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}