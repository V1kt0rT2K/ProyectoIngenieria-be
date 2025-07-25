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
}

export default StatusService;