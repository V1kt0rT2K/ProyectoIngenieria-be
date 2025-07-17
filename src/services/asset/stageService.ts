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
    static async getById(idStage: string){
        const data = await Stage.findByPk(idStage);

        if(!data){
            return JsonResponse.error(400, "No existe el estado con el id proporcionado.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }
}

export default StageService;