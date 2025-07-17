import { Request, Response} from 'express';
import { formatRequest, badRequestMessage } from '../../utils/requestParams';
import StageService from '../../services/asset/stageService';

export const getAllStages = async (req: Request, res: Response) => {
    try {
        const result = await StageService.getAll();

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}
export const getStageById = async (req: Request, res: Response) => {
    try{
        const params = formatRequest(req)
        const result= await StageService.getById(params.idStage);   
        res.status(result.getStatus()).json(result);
    }catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }


}




