import JsonResponse from "../../utils/jsonResponse";
import Supply from "../../models/supplys/supplyModel";

class SupplyService {
    constructor() {}

    static async getAll() {
        const data = await Supply.findAll();

        if (!data) {
            return JsonResponse.error(400, "No existen datos.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }

    static async getById(idSupply: string) {
        const data = await Supply.findByPk(idSupply);

        if (!data) {
            return JsonResponse.error(400, "No existe el suministro con el id proporcionado.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }
    static async getSupplybyType(idSupplyType:number){
        const data = await Supply.findAll({
            where: {
                idSupplyType: idSupplyType
            }
        });

        if (!data || data.length === 0) {
            return JsonResponse.error(400, "No existen suministros para el tipo proporcionado.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");

    }
}
export default SupplyService;
