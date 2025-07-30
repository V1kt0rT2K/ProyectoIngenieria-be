import { Transaction } from 'sequelize';
import Notification from '../../models/assets/notificationModel';
import sequelize from '../../utils/connection';
import JsonResponse from '../../utils/jsonResponse';

class NotificationService {
    constructor(){}

    static async getAllNotificationsForUser(idUser : number | undefined){

        const data =  await Notification.findAll({
            where:{
                idUser : idUser
            }
        });
        if(data.length == 0)
            return JsonResponse.error(404, "No se han encontrado datos.");

        return JsonResponse.success(data,'La petición fue exitosa.');
    }

    static async checkNotification(idNotification: number){

        const t = await sequelize.transaction();

        try{
            await Notification.update({
                show : false
            },{
                where:{
                    idNotification : idNotification
                },
                transaction: t
            });

            await t.commit();
            return JsonResponse.success({},'La petición fue exitosa.');

        }catch(error){
            console.log(error);
            await t.rollback();
            return JsonResponse.error(501, "Error al actualizar notificación.");
        }
    }

    static async createNotification(idUser: number | undefined, message: string, t : Transaction){
        if(!idUser)
            return;

        await Notification.create({
            idUser : idUser,
            message : message
        },{
            transaction : t
        });
    }
}

export default NotificationService;