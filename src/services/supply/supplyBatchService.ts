import JsonResponse from "../../utils/jsonResponse";
import SupplyBatch from "../../models/supplys/supplyBatchModel";
import SupplyService from "./supplyService";
import Supply from "../../models/supplys/supplyModel";
import SupplyType from "../../models/supplys/supplyTypeModel";
import { Model, Op } from "sequelize";
class SupplyBatchService {
    constructor() {}

    static async getAllSupplyBatches() {
        const data = await SupplyBatch.findAll({
            include: [{
                model: Supply,
                required: true,
                include: [{
                    model: SupplyType,
                    required: true
                }]
            }]
        });

        if (!data || data.length === 0) {
            return JsonResponse.error(400, "No existen lotes de suministros.");
        }
        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }

    static async getSupplyBatchById(idSupplyBatch: string) {
        const data = await SupplyBatch.findByPk(idSupplyBatch);

        if (!data) {
            return JsonResponse.error(400, "No existe el lote de suministro con el id proporcionado.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }

    static async getSupplyBatchesByIdType(idSupplyType: number) {
        const data = await SupplyBatch.findAll({
            include: [
                { model: Supply,required: true,
                    include: [
                        { model: SupplyType, required: true}
                    ]
            }],
            where: {
                '$Supply.SupplyType.idSupplyType$' : idSupplyType
            }
        });

        if (!data) {
            return JsonResponse.error(400, "No existe el lote de suministro con el id proporcionado.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }

}
export default SupplyBatchService;