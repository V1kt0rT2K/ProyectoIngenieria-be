import VaccineBatch from "../../models/supplys/vaccineBatchModel";
import Vaccine from "../../models/supplys/vaccineModel";
import JsonResponse from "../../utils/jsonResponse";

class VaccineBatchService{

    static async getAll(){
        const data =  await VaccineBatch.findAll({
            include:[
                {model: Vaccine, required: true}
            ]
        });

        if(data.length == 0){
            return JsonResponse.error(400, "No se ha encontrado datos.");
        }

        return JsonResponse.success(data,'La petición fue exitosa.');
    }

}

export default VaccineBatchService;