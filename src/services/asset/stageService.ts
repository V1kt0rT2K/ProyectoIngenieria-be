import Stage from "../../models/assets/stageModel";
import JsonResponse from "../../utils/jsonResponse";


class StageService{
    constructor(){}


    static async getAll(){
        const data = await Stage.findAll();

        if(!data){
            return JsonResponse.error(400,"No existen datos.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
            
    }
}

export default StageService;