import JsonResponse from '../utils/jsonResponse';
import SwineBatch from '../models/stocks/swineBatchModel';
import Swines from '../models/stocks/swineModel';
class StockService {

    constructor() {}
    static async getAllSwineBatches() {
        try {
        
            const data = await SwineBatch.findAll();
            
            return JsonResponse.success(data, 'All swine batches retrieved successfully.');
        } catch (error) {
            console.error(error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }
    static async getSwineBatchByStage(idStage: number) {
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
    static async getSwineBatchById(idSwineBatch: number) {
        try {
            const data = await SwineBatch.findByPk(idSwineBatch);
            
            if (!data) {
                return JsonResponse.error(404, "Lote de cerdos no encontrado.");
            }
            
            return JsonResponse.success(data, 'Lote de cerdos obtenido exitosamente.');
        } catch (error) {
            console.error(error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }
    static async getSwinesByBatch(idSwineBatch: number) {
        try{

            let data=[];
            const batch = await SwineBatch.findByPk(idSwineBatch);
            if (!batch) {
                return JsonResponse.error(404, "Lote de cerdos no encontrado.");
            }
            data = await Swines.findAll({
                where: { idSwineBatch }
            });
            if (data.length === 0) {
                return JsonResponse.error(404, "No se encontraron cerdos en este lote.");
            }
            return JsonResponse.success(data, 'Cerdos del lote obtenidos exitosamente.');


        }catch (error) {
            console.error(error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }

}
export default StockService;