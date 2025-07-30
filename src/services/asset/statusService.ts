import { Op } from 'sequelize';
import Status from '../../models/assets/statusModel';
import JsonResponse from '../../utils/jsonResponse';

class StatusService {
    constructor(){}

    static async getAll(){
        const data =  await Status.findAll();
        return JsonResponse.success(data,'La petición fue exitosa.');
    }

    static async getStatusByIdStatusType(idStatusType: number){

        const data =  await Status.findAll({
            where:{
                idStatusType: idStatusType
            }
        });

        if(data.length == 0){
            return JsonResponse.error(400,"No se han encontrado datos.");
        }
        return JsonResponse.success(data,'La petición fue exitosa.');
    }

    static async getStatusForUserRequests(){
        const data = await Status.findAll({
            where : {
                idStatusType : 1
            }
        });

        if(data.length == 0)
            return JsonResponse.error(400,"No se han encontrado datos.");

        return JsonResponse.success(data,'La petición fue exitosa.');
    }

    static async getStatusForPurcharses(){
        const data = await Status.findAll({
            where : {
                idStatusType : {
                    [Op.or]: [1, 2]
                }
            }
        });

        if(data.length == 0)
            return JsonResponse.error(400,"No se han encontrado datos.");

        return JsonResponse.success(data,'La petición fue exitosa.');
    }
}

export default StatusService;