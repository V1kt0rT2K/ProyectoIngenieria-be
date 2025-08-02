import JsonResponse from "../../utils/jsonResponse";
import sequelize from "../../utils/connection";
import Product from "../../models/stocks/productModel";
import { IncomingProductProp } from "../../utils/interfaces/Interface";
import { Op, Sequelize } from "sequelize";
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
        
        static async searchProduct(searchParam: string, page: number, size: number, sort: number) {
    if (page <= 0) page = 1;
    if (size <= 0) size = 15;
    if (sort !== 0 && sort !== 1) sort = 0;

    // Verificar si el parámetro es numérico (para búsqueda por precio)
    const isNumeric = !isNaN(parseFloat(searchParam));

    const whereClause: any = {};
    const searchConditions = [];
    
    // Búsqueda por nombre de producto (case-insensitive)
    searchConditions.push(Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('productName')),
        { [Op.like]: `%${searchParam.toLowerCase()}%` }
    ));

    // Si es numérico, buscar por precio
    if (isNumeric) {
        searchConditions.push({ 
            price: { [Op.eq]: parseFloat(searchParam) }
        });
    }

    // Solo aplicar condiciones si hay parámetro de búsqueda
    if (searchParam) {
        whereClause[Op.or] = searchConditions;
    }

    try {
        const { count, rows } = await Product.findAndCountAll({
            where: searchParam ? whereClause : {},
            order: [
                ['productName', sort === 0 ? 'DESC' : 'ASC'],
                ['price', sort === 0 ? 'DESC' : 'ASC'] // Orden adicional por precio
            ],
            offset: (page - 1) * size,
            limit: size
        });

        if (!rows || rows.length === 0) {
            return JsonResponse.error(400, "No se encontraron productos.");
        }

        return JsonResponse.success(
            { data: rows, totalItems: count },
            "Búsqueda de productos exitosa."
        );
    } catch (error) {
        console.error("Error en searchProduct:", error);
        return JsonResponse.error(500, "Error al buscar productos");
    }
} }
export default ProductService;