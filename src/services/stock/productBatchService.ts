import JsonResponse from "../../utils/jsonResponse";
import ProductBatch from "../../models/stocks/productBatchModel";
import Product from "../../models/stocks/productModel";
import sequelize from "../../utils/connection";
import { IncomingProductBatchProp } from "../../utils/interfaces/Interface";
import { Op,Sequelize } from "sequelize";

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
static async searchProductBatch(searchParam: string, page: number, size: number, sort: number) {
    if (page <= 0) page = 1;
    if (size <= 0) size = 15;
    if (sort !== 0 && sort !== 1) sort = 0;

    
    const isDateValid = !isNaN(Date.parse(searchParam));
    const isNumeric = !isNaN(parseFloat(searchParam));

    const whereClause: any = {
        stockQuantity: { [Op.gt]: 0 }
    };

    
    const searchConditions = [];
    
    
    searchConditions.push(Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('Product.productName')),
        { [Op.like]: `%${searchParam.toLowerCase()}%` }
    ));

    
    if (isDateValid) {
        searchConditions.push({ 
            expirationDate: { [Op.eq]: new Date(searchParam) }
        });
    }

    
    if (isNumeric) {
        searchConditions.push({ 
            stockQuantity: { [Op.eq]: parseFloat(searchParam) }
        });
    }

    whereClause[Op.or] = searchConditions;

    try {
        const {count, rows} = await ProductBatch.findAndCountAll({
            include: [{ model: Product, required: true }],
            where: whereClause,
            offset: (page - 1) * size,
            limit: size,
            
            order: sort === 1 ? 
                [[Sequelize.col('Product.productName'), 'ASC']] : 
                [[Sequelize.col('Product.productName'), 'DESC']]
        });

        if (!rows || rows.length === 0) {
            return JsonResponse.error(400, "No existen lotes de productos.");
        }

        return JsonResponse.success(
            { data: rows, totalItems: count }, 
            "Lotes de productos encontrados exitosamente."
        );
    } catch (error) {
        console.error("Error en searchProductBatch:", error);
        return JsonResponse.error(500, "Error al buscar lotes de productos");
    }
}
}
export default ProductBatchService;