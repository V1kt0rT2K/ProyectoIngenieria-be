import JsonResponse from "../../utils/jsonResponse";
import sequelize from "../../utils/connection";
import Product from "../../models/stocks/productModel";
import { IncomingProductProp } from "../../utils/interfaces/Interface";
class ProductService {

    static async getAllProducts(page: number, size: number, sort: number) {
        if(page <=0){
            page = 1;
        }
        if(size <= 0){
            size = 15;
        }
        if(sort != 0 && sort != 1){
            sort = 0;
        }

        try {
        
            const {count,rows} = await Product.findAndCountAll({
                order: [
                    ['productName', sort === 0 ? 'DESC' : 'ASC']
                ],
                offset: (page - 1) * size,
                limit: size
            });

            if(rows.length == 0){
                return JsonResponse.error(400, "No existen datos.");
            }
            
            return JsonResponse.success({data:rows,totalItems:count}, 'La petición ha sido un éxito.');
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