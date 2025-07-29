import JsonResponse from "../../utils/jsonResponse";
import sequelize from "../../utils/connection";
import Product from "../../models/stocks/productModel";

class ProductService {

    static async getAll() {
        try {
        
            const data = await Product.findAll();

            if(data.length == 0){
                return JsonResponse.error(400, "No existen datos.");
            }
            
            return JsonResponse.success(data, 'La petición ha sido un éxito.');
        } catch (error) {
            console.error(error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }
    static async getProductsbyid(idProduct:number){
        try{
            const data= await Product.findByPk(idProduct);
            if(data==null){
                return JsonResponse.error(400, "No existen datos.");
            }
            return JsonResponse.success(data, 'Se ah encontrado el Producto con exito.');
        }catch(error){
            console.error(error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }

    }

}
export default ProductService;