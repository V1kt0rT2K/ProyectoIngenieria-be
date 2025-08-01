import JsonResponse from "../../utils/jsonResponse";
import SupplyBatch from "../../models/supplys/supplyBatchModel";
import SupplyService from "./supplyService";
import sequelize from "../../utils/connection";
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
    static async getSuppbyBatchbyMenorExpirationDate() {
        const data = await SupplyBatch.findAll({
            include: [
                { model: Supply, required: true,
                    include: [
                        { model: SupplyType, required: true}
                    ]
                }
            ],
            where: {
                    stockQuantity :{
                        [Op.gt] : 0
                    }
            
            },
            order: [['expirationDate', 'ASC']]
            
        });

        if (!data || data.length === 0) {
            return JsonResponse.error(400, "No existen lotes de suministros.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }
    static async updateStckSupplyBatch(idSupplyBatch: number, quantity: number) {
        const SupplyBatchbyid = await SupplyBatch.findByPk(idSupplyBatch);

        if (!SupplyBatchbyid) {
            return JsonResponse.error(400, "No existe el lote de suministro con el id proporcionado.");
        }
        if (quantity <= 0) {
            return JsonResponse.error(400, "La cantidad debe ser positiva.");
        }
        if (SupplyBatchbyid.stockQuantity < quantity) {
            return JsonResponse.error(400, "La cantidad a actualizar no puede ser mayor que la cantidad en stock.");
        }
        if(SupplyBatchbyid.stockQuantity <=0){
            return JsonResponse.error(400, "No hay stock disponible para actualizar.");}
        const t = await sequelize.transaction();
        try { 
            await SupplyBatchbyid.update(
                { stockQuantity: SupplyBatchbyid.stockQuantity-quantity },
                {transaction: t }
            );
            await t.commit();
            return JsonResponse.success(SupplyBatchbyid, "Lote de suministro actualizado exitosamente.");

        }
        catch (error) {
        
            console.error(error);
            await t.rollback();
            console.error('Error al actualizar el lote de suministro:', error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }



    }

}
export default SupplyBatchService;