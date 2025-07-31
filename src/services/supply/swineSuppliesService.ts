import JsonResponse from "../../utils/jsonResponse";
import SwineSupply from "../../models/supplys/swineSupplyModel";
import SwineBatch from "../../models/stocks/swineBatchModel";
import Supply from "../../models/supplys/supplyModel";
import SupplyType from "../../models/supplys/supplyTypeModel";
import User from "../../models/users/userModel";
import Person from "../../models/users/personModel";
class SwineSupplyService {
    constructor() {}

    static async getAllSwineSupply() {
        const data = await SwineSupply.findAll({
        include: [
            {
                model: SwineBatch,
                required: true,
                
            },{
                model:Supply,
                required: true
            },
            {
                model: User,
                required: true
            }]
        });

        if (!data || data.length === 0) {
            return JsonResponse.error(400, "No existen suministros de cerdos.");
        }
        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }
    static async getAllSwineSupplybyidSwineBatch(idSwineBatch: number) {
        const data = await SwineSupply.findAll({
            
        include: [
            {
                model: SwineBatch,
                required: true,
                
            },{
                model:Supply,
                required: true,
                include: [
                            { model: SupplyType, required: true}
                        ]
            },
            {
                model: User,
                required: true,
                include:[
                    {model:Person, required:true}
                ]
            }],
            where:  {idSwineBatch : idSwineBatch},
        });

        if (!data || data.length === 0) {
            return JsonResponse.error(400, "No existen suministros de cerdos.");
        }
        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }
}
export default SwineSupplyService;