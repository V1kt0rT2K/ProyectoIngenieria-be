import JsonResponse from "../../utils/jsonResponse";
import SwineBatch from "../../models/stocks/swineBatchModel";

import { IncomingBatchProp } from "../../utils/interfaces/Interface";
import sequelize from "../../utils/connection";
import Stage from "../../models/assets/stageModel";
import { Op } from "sequelize";

class SwineBatchService {

    static async getAllSwineBatch(page:number, size:number, sort:number) {
        if (page <= 0) {
            page = 1;
        }
        if (size <= 0) {
            size = 15;
        }
        if (sort !== 0 && sort !== 1) {
            sort = 0;
        }
        try {
        
            const {count,rows} = await SwineBatch.findAndCountAll({
                include:[
                    {model : Stage, required: true}
                ],
                where: {
                    stockQuantity :{
                        [Op.gt] : 0
                    }
                },
                order: [
                    [Stage, "stageName", sort === 0 ? "DESC" : "ASC"]
                ],
                offset: (page - 1) * size,
                limit: size
            });

            if(rows.length == 0){
                return JsonResponse.error(400, "No existen datos.");
            }
            
            return JsonResponse.success({data:rows,totalItems:count}, 'La peticion a sido un exito.');
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
                include:[{model : Stage, required: true}]
            ,
                where: { idStage,
                    stockQuantity :{
                        [Op.gt] : 0
                    }
                }
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

        //Manejo de errores
        if(incomingBatchProp.quantity <= 0 ){
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
                birthDate : new Date(incomingBatchProp.birthDate),
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
    
    }

    static async updateSwineBatchStage(idSwineBatch : number, idStage : number): Promise<JsonResponse>{

        const stage = await Stage.findByPk(idStage);
        if(!stage)
            return JsonResponse.error(400,"Etapa seleccionada inválida.");

        const swineBatch = await SwineBatch.findByPk(idSwineBatch);
        if(!swineBatch)
            return JsonResponse.error(500,"El lote de cerdos no existe.");


        ////VALIDACION DE LOS ESTADOS
        if( (swineBatch.idStage >= idStage) || (stage.idStage - swineBatch.idStage > 1))
            return JsonResponse.error(500,"Etapa seleccionada inválida.");

        const t = await sequelize.transaction();
        try{

            await SwineBatch.update({
                idStage : idStage
            },{
                where :{
                    idSwineBatch: swineBatch.idSwineBatch
                }, 
                transaction : t
            });

            await t.commit();

            return JsonResponse.success({},"El lote de cerdos se ha actualizado con éxito.");

        }catch(err){
            await t.rollback();
            console.log(err);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }
}
export default SwineBatchService;