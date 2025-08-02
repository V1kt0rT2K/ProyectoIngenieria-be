import JsonResponse from "../../utils/jsonResponse";
import ProductBatch from "../../models/stocks/productBatchModel";
import Product from "../../models/stocks/productModel";
import sequelize from "../../utils/connection";
import { IncomingProductBatchProp } from "../../utils/interfaces/Interface";
import { Op } from "sequelize";

class ProductBatchService {

    static async getAllProductBatch(page: number, size: number, sort: number) {
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
                const {count,rows} = await ProductBatch.findAndCountAll({
                    include: [
                        { model: Product, required: true } ]
                        ,where: {
                                    stockQuantity :{
                                    [Op.gt] : 0
                                                    }
                                },
                    order: [
                        ['expirationDate', sort === 0 ? 'DESC' : 'ASC']
                    ],
                    offset: (page - 1) * size,
                    limit: size
                });

            if(rows.length == 0){
                return JsonResponse.error(400, "No existen datos.");
            }
            
            return JsonResponse.success({data:rows,totalItems:count}, 'All product batches retrieved successfully.');
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