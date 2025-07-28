import { Request, Response} from 'express';
import { formatRequest, badRequestMessage } from '../../utils/requestParams';
import NotificationService from '../../services/asset/notificationService';
import { getUserFromJWT } from '../../utils/jwtService';

export const getAllNotificationsForUser = async (req: Request, res: Response) => {
    try {
        const user = await getUserFromJWT(req);

        const result = await NotificationService.getAllNotificationsForUser(user);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}
export const checkNotification = async (req: Request, res: Response) => {
    try{
        const params = formatRequest(req)
        
        const result= await NotificationService.checkNotification(params.idNotification);

        res.status(result.getStatus()).json(result);
    }catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }


}
