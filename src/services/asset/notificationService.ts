import { Op, Transaction } from 'sequelize';
import Notification from '../../models/assets/notificationModel';
import sequelize from '../../utils/connection';
import JsonResponse from '../../utils/jsonResponse';
import User from '../../models/users/userModel';
import UserRole from '../../models/users/userRoleModel';

class NotificationService {
    constructor(){}

    static async getAllNotificationsForUser(idUser : number | undefined){

        const data =  await Notification.findAll({
            where:{
                [Op.and]: [
                    {idUser : idUser},
                    {show : true}
                ]
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

    static async sendNotificationByRole(idRole: number | undefined, message: string, t : Transaction){
        if(!idRole)
            return;

        const users = await User.findAll({
            include : [
                {model : UserRole, required:true}
            ],
            where :{
                "$UserRole.idRole$" : idRole
            },
            transaction : t
        });

        if(!users)
            return;

        await Notification.bulkCreate(
            users.map((user) => {
                return {
                    message : message,
                    idUser : user.idUser
                }
            }),
            {
                transaction : t
            }
        );

        return;
    }

    static async sendNotificationByUser(idUser: number | undefined, message: string, t : Transaction){
        if(!idUser)
            return;

        const users = await User.findByPk(idUser,
            {
                transaction : t
            }
        );

        if(!users)
            return;

        await Notification.create(
            {
                idUser : idUser,
                message : message
            },
            {
                transaction : t
            }
        );

        return;
    }
}

export default NotificationService;