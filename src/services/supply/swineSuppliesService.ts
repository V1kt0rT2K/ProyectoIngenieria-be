import JsonResponse from "../../utils/jsonResponse";
import SwineSupply from "../../models/supplys/swineSupplyModel";
class SwineSupplyService {
    constructor() {}

    static async getAllSwineSupply() {
        const data = await SwineSupply.findAll();

        if (!data || data.length === 0) {
            return JsonResponse.error(400, "No existen suministros de cerdos.");
        }
        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }
}
export default SwineSupplyService;