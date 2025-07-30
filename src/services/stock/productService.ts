import JsonResponse from "../../utils/jsonResponse";
import sequelize from "../../utils/connection";
import Product from "../../models/stocks/productModel";
import { IncomingProductProp } from "../../utils/interfaces/Interface";
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
    static async createProduct(IncomingProductProp:IncomingProductProp){
        if(IncomingProductProp== null){
            return JsonResponse.error(400, "No existen Datos.");
        }
        if(!IncomingProductProp.productName || !IncomingProductProp.productDescription || !IncomingProductProp.price || !IncomingProductProp.orderPoint){
            return JsonResponse.error(400, "Faltan datos requeridos.");
        }
        const t = await sequelize.transaction();
        try{
            const data = await Product.create({
                productName: IncomingProductProp.productName,
                productDescription: IncomingProductProp.productDescription,
                price: IncomingProductProp.price,
                orderPoint: IncomingProductProp.orderPoint
            },{
                    transaction : t
                });
                await t.commit();
                return JsonResponse.success(data, 'Producto creado con éxito.');
    }catch(error){
        console.error(error);
        await t.rollback();
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }}

}
export default ProductService;