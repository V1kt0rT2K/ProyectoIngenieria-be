import JsonResponse from "../../utils/jsonResponse";
import ProductBatch from "../../models/stocks/productBatchModel";
import Product from "../../models/stocks/productModel";
import sequelize from "../../utils/connection";
import { IncomingProductBatchProp } from "../../utils/interfaces/Interface";

class ProductBatchService {

    static async getAll() {
        try {
                const data = await ProductBatch.findAll({
                    include: [
                        { model: Product, required: true } ]
                });

            if(data.length == 0){
                return JsonResponse.error(400, "No existen datos.");
            }
            
            return JsonResponse.success(data, 'All product batches retrieved successfully.');
        } catch (error) {
            console.error(error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }

    static async createProductBatch(IncomingProductBatchProp : IncomingProductBatchProp) {
        try{
            if(IncomingProductBatchProp.entryQuantity <= 0) {
                return JsonResponse.error(400, "La cantidad de entrada debe ser mayor a cero.");
            }
            const t = await sequelize.transaction();
            try{
            const productBatch = await ProductBatch.create({
                idProduct: IncomingProductBatchProp.idProduct,
                idSwineBatch: IncomingProductBatchProp.idSwineBatch,
                entryQuantity: IncomingProductBatchProp.entryQuantity,
                stockQuantity: IncomingProductBatchProp.entryQuantity,
                expirationDate: IncomingProductBatchProp.expirationDate,
                generationDate:IncomingProductBatchProp.generationDate
            },{
                transaction: t
            });
            await t.commit();

            return JsonResponse.success(productBatch, 'Lote de Producto agregado con exito.');
        }catch(error) {
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
export default ProductBatchService;