import JsonResponse from "../../utils/jsonResponse";
import ProductBatch from "../../models/stocks/productBatchModel";
import Product from "../../models/stocks/productModel";
import sequelize from "../../utils/connection";
import SwineBatchService from "./swineBatchService";
import { IncomingProductBatchProp } from "../../utils/interfaces/Interface";
import { Op,Sequelize } from "sequelize";
import SwineBatch from "../../models/stocks/swineBatchModel";

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

    static async createProductBatch(payload: IncomingProductBatchProp) {
    const t = await sequelize.transaction();
    
    try {

        const swineBatch = await SwineBatch.findByPk(payload.idSwineBatch, { transaction: t });
        if (!swineBatch) throw new Error("Lote de cerdos no encontrado");
        if (swineBatch.stockQuantity < payload.decrementSwine) throw new Error("Stock insuficiente");

        swineBatch.update({
            stockQuantity: swineBatch.stockQuantity - payload.decrementSwine },
            { transaction: t });

        for (const detail of payload.detail) {
            if (detail.entryQuantity <= 0) throw new Error("Cantidad inválida");
            if (detail.expirationDate <= new Date()) throw new Error("Fecha expiración inválida");
            
            await ProductBatch.create({
                idProduct: detail.idProduct,
                idSwineBatch: payload.idSwineBatch,
                entryQuantity: detail.entryQuantity,
                stockQuantity: detail.entryQuantity,
                expirationDate: detail.expirationDate,
                generationDate: detail.generationDate
            }, { transaction: t });
        }

        await t.commit();
        return JsonResponse.success(null, 'Lotes creados exitosamente');
        
    } catch (error) {
        await t.rollback();
        return JsonResponse.error(400, "eror al crear lotes de producto");
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