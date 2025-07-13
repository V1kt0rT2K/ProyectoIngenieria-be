import JsonResponse from "../../utils/jsonResponse";
import SwineBatch from "../../models/stocks/swineBatchModel";
import Swine from "../../models/stocks/swineModel";
import VaccineBatch from "../../models/supplys/vaccineBatchModel";
import Vaccine from "../../models/supplys/vaccineModel";

class SwineBatchService {

    static async getAll() {
        try {
        
            const data = await SwineBatch.findAll();

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
                        {model:Swine, required:true}
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

    static async getSwinesByBatch(idSwineBatch: number) {
        try{

            const data = await SwineBatch.findByPk(
                idSwineBatch,
                {
                    include: [
                        {model:Swine, required:true}
                    ]
                }
            );

            if (!data) {
                return JsonResponse.error(404, "No se encontraron cerdos en este lote.");
            }
            return JsonResponse.success(data, 'Cerdos del lote obtenidos exitosamente.');


        }catch (error) {
            console.error(error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }

    static async getMedicalRecordById(idSwineBatch: number) {
        try{

            const data = await SwineBatch.findByPk(idSwineBatch,{
                include:[
                    { model: VaccineBatch, required: true ,
                        include:[
                            { model: Vaccine, required: true}
                        ]
                    }
                ]
            });
            

            if (!data) {
                return JsonResponse.error(404, "No se encontraron cerdos en este lote.");
            }
            return JsonResponse.success(data, 'Cerdos del lote obtenidos exitosamente.');


        }catch (error) {
            console.error(error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }
}

export default SwineBatchService;