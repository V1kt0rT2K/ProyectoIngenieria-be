import JsonResponse from "../../utils/jsonResponse";
import SwineBatch from "../../models/stocks/swineBatchModel";

import { IncomingBatchProp } from "../../utils/interfaces/Interface";
import sequelize from "../../utils/connection";
import Stage from "../../models/assets/stageModel";
import { Op } from "sequelize";

class SwineBatchService {

    static async getAll() {
        try {
        
            const data = await SwineBatch.findAll({
                include:[
                    {model : Stage, required: true}
                ],
                where: {
                    stockQuantity :{
                        [Op.gt] : 0
                    }
                },
            });

            if(data.length == 0){
                return JsonResponse.error(400, "No existen datos.");
            }
            
            return JsonResponse.success(data, 'All swine batches retrieved successfully.');
        } catch (error) {
            console.error(error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }

    static async getSwineBatchById(idSwineBatch: number) {
        try {

            const data = await SwineBatch.findByPk(
                idSwineBatch,
                {
                    include: [
                        {model:Stage, required:true}
                    ]
                }
            );
            
            if (!data) {
                return JsonResponse.error(404, "Lote de cerdos no encontrado.");
            }
            
            return JsonResponse.success(data, 'Lote de cerdos obtenido exitosamente.');
        } catch (error) {
            console.error(error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }

    static async getSwineBatchByIdStage(idStage: number) {
        try {
            const data = await SwineBatch.findAll({
                where: { idStage }
            });
            
            if (data.length === 0) {
                return JsonResponse.error(404, "No se encontraron lotes de cerdos para esta etapa.");
            }
            
            return JsonResponse.success(data, 'Lotes de cerdos por etapa obtenidos exitosamente.');
        } catch (error) {
            console.error(error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }

    
    

    static async createSwineBatch(incomingBatchProp : IncomingBatchProp) {
        try{

            //Manejo de errores
            if(incomingBatchProp.swineQuantityRemaining <= 0 || incomingBatchProp.estimatedWeight <= 0){
                return JsonResponse.error(500,"Datos invalidos.");
            }

            const stage = await Stage.findOne({
                where : {
                    stageName : "Pre-Inicio"
                }
            });

            if(!stage){
                return JsonResponse.error(400,"Datos invalidos de etapa.");
            }

            const t = await sequelize.transaction();

            try{

                const swineBatch = await SwineBatch.create({
                    swineQuantityRemaining : incomingBatchProp.swineQuantityRemaining,
                    estimatedWeight : incomingBatchProp.estimatedWeight,
                    quantity : incomingBatchProp.quantity,
                    stockQuantity: incomingBatchProp.quantity,
                    idStage : stage.idStage
                },{
                    transaction : t
                });
                await t.commit();
                return JsonResponse.success(swineBatch, "Lote de cerdos creado exitosamente.");

        }catch (error) {
            console.error(error);
            await t.rollback();
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }catch (error) {
            console.error(error); 
            return JsonResponse.error(500, "Error Interno del Servidor.");

            }
    
}
}
export default SwineBatchService;