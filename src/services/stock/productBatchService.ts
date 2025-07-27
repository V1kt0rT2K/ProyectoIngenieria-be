import JsonResponse from "../../utils/jsonResponse";
import ProductBatch from "../../models/stocks/productBatchModel";
import Product from "../../models/stocks/productModel";

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

}
export default ProductBatchService;