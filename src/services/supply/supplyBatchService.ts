import JsonResponse from "../../utils/jsonResponse";
import SupplyBatch from "../../models/supplys/supplyBatchModel";
import SupplyService from "./supplyService";
import Stage from "../../models/assets/stageModel";
import sequelize from "../../utils/connection";
import Supply from "../../models/supplys/supplyModel";
import SupplyType from "../../models/supplys/supplyTypeModel";
import { Model, Op } from "sequelize";
import { Sequelize } from "sequelize";
class SupplyBatchService {
    constructor() {}

    static async getAllSupplyBatches(page:number,size:number,sort:number) {
        if (page <= 0) {
            page = 1;
        }
        if (size <= 0) {
            size = 15;
        }
        if (sort !== 0 && sort !== 1) {
            sort = 0;
        }
        const {count,rows} = await SupplyBatch.findAndCountAll({
            include: [{
                model: Supply,
                required: true,
                include: [{
                    model: SupplyType,
                    required: true, 
                },{model:Stage,
                    required: true}]
            }],
            where: {
                stockQuantity: {
                    [Op.gt]: 0
                }
            },
            order: [['expirationDate', sort === 0 ? 'DESC' : 'ASC']],
            offset: (page - 1) * size,
            limit: size
        });

        if (!rows || rows.length === 0) {
            return JsonResponse.error(400, "No existen lotes de suministros.");
        }
        return JsonResponse.success({data:rows,totalItems:count}, "La petición ha sido un éxito.");
    }

    static async getSupplyBatchById(idSupplyBatch: string) {
        const data = await SupplyBatch.findByPk(idSupplyBatch);

        if (!data) {
            return JsonResponse.error(400, "No existe el lote de suministro con el id proporcionado.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }

    static async getSupplyBatchesByIdType(idSupplyType: number,page:number, size:number, sort:number) {
        if (page <= 0) {
            page = 1;
        }
        if (size <= 0) {
            size = 15;
        }
        if (sort !== 0 && sort !== 1) {
            sort = 0;
        }
        const {count,rows}= await SupplyBatch.findAndCountAll({
            include: [
                { model: Supply,required: true,
                    include: [
                        { model: SupplyType, required: true},{model:Stage,
                    required: true}
                    ]
            }],
            where: {
                    stockQuantity: {
                    [Op.gt]: 0
                },
                '$Supply.SupplyType.idSupplyType$' : idSupplyType
            },
            order: [['expirationDate', sort === 0 ? 'DESC' : 'ASC']],
            offset: (page - 1) * size,
            limit: size
        });

        if (!rows || rows.length === 0) {
            return JsonResponse.error(400, "No existe el lote de suministro con el id proporcionado.");
        }

        return JsonResponse.success({data:rows,totalItems:count}, "La petición ha sido un éxito.");
    }
    static async getSupplyBatchesNearExpiration() {
    
        const today = new Date();
        
        const batches = await SupplyBatch.findAll({
            include: [
                {
                    model: Supply,
                    required: true,
                    include: [{
                        model: SupplyType,
                        required: true,
                        
                    }]
                }
            ],
            where: {
                stockQuantity: { [Op.gt]: 0 },
                expirationDate: { [Op.gte]: today } 
            },
            order: [
                ['expirationDate', 'ASC'] 
            ],
        });

        if (!batches || batches.length === 0) {
            return JsonResponse.error(400,"No se encontraron lotes próximos a expirar");
        }
        return JsonResponse.success(
            batches , 
            "Lotes próximos a expirar obtenidos con éxito"
        );
    
}
    static async updateStckSupplyBatch(idSupplyBatch: number, quantity: number) {
        const SupplyBatchbyid = await SupplyBatch.findByPk(idSupplyBatch);

        if (!SupplyBatchbyid) {
            return JsonResponse.error(400, "No existe el lote de suministro con el id proporcionado.");
        }
        if (quantity <= 0) {
            return JsonResponse.error(400, "La cantidad debe ser positiva.");
        }
        if (SupplyBatchbyid.stockQuantity < quantity) {
            return JsonResponse.error(400, "La cantidad a actualizar no puede ser mayor que la cantidad en stock.");
        }
        if(SupplyBatchbyid.stockQuantity <=0){
            return JsonResponse.error(400, "No hay stock disponible para actualizar.");}
        const t = await sequelize.transaction();
        try { 
            await SupplyBatchbyid.update(
                { stockQuantity: SupplyBatchbyid.stockQuantity-quantity },
                {transaction: t }
            );
            await t.commit();
            return JsonResponse.success(SupplyBatchbyid, "Lote de suministro actualizado exitosamente.");

        }
        catch (error) {
        
            console.error(error);
            await t.rollback();
            console.error('Error al actualizar el lote de suministro:', error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }
    static async searchSupplyBatch(searchParam: string, page: number, size: number, sort: number) {

    if (page <= 0) page = 1;
    if (size <= 0) size = 15;
    if (sort !== 0 && sort !== 1) sort = 0;
    const isDateValid = !isNaN(Date.parse(searchParam));
    const isNumeric = !isNaN(parseFloat(searchParam));
    const whereClause: any = {
        stockQuantity: { [Op.gt]: 0 }
    };
    const searchConditions = [];

    searchConditions.push(
        { '$Supply.nameSupply$': { [Op.like]: `%${searchParam}%` } },
        { '$Supply.SupplyType.nameSupplyType$': { [Op.like]: `%${searchParam}%` } }
    );
    if (isDateValid) {
        searchConditions.push({ 
            expirationDate: { [Op.eq]: new Date(searchParam) }
        });
    }
    if (isNumeric) {
        const numericValue = parseFloat(searchParam);
        searchConditions.push(
            { stockQuantity: { [Op.eq]: numericValue } },
            Number.isInteger(numericValue) ? { idSupplyBatch: numericValue } : {}
        );
    }
    whereClause[Op.or] = searchConditions;

    try {
        const { count, rows } = await SupplyBatch.findAndCountAll({
            include: [
                { 
                    model: Supply, 
                    required: true,
                    include: [
                        { model: SupplyType, required: true },
                        { model: Stage, required: true }
                    ]
                },
            ],
            where: whereClause,
            offset: (page - 1) * size,
            limit: size,
            order: sort === 1 ? 
                [[Sequelize.col('Supply.nameSupply'), 'ASC']] : 
                [[Sequelize.col('Supply.nameSupply'), 'DESC']]
        });

        if (!rows || rows.length === 0) {
            return JsonResponse.error(404, "No se encontraron lotes de suministros.");
        }

        return JsonResponse.success({data:rows,totalItems:count}, "La petición ha sido un éxito.");
    } catch (error) {
        console.error("Error en searchSupplyBatch:", error);
        return JsonResponse.error(500, "Error interno al buscar lotes de suministros");
    }
}
    static async searchSupplyBatchType(idSupplyType:number,searchParam: string, page: number, size: number, sort: number) {

    if (page <= 0) page = 1;
    if (size <= 0) size = 15;
    if (sort !== 0 && sort !== 1) sort = 0;
    const isDateValid = !isNaN(Date.parse(searchParam));
    const isNumeric = !isNaN(parseFloat(searchParam));
    const whereClause: any = {
        stockQuantity: { [Op.gt]: 0 },
        '$Supply.SupplyType.idSupplyType$': idSupplyType
    };
    const searchConditions = [];

    searchConditions.push(
        { '$Supply.nameSupply$': { [Op.like]: `%${searchParam}%` } },
        { '$Supply.SupplyType.nameSupplyType$': { [Op.like]: `%${searchParam}%` } }
    );
    if (isDateValid) {
        searchConditions.push({ 
            expirationDate: { [Op.eq]: new Date(searchParam) }
        });
    }
    if (isNumeric) {
        const numericValue = parseFloat(searchParam);
        searchConditions.push(
            { stockQuantity: { [Op.eq]: numericValue } },
            Number.isInteger(numericValue) ? { idSupplyBatch: numericValue } : {}
        );
    }
    whereClause[Op.or] = searchConditions;

    try {
        const { count, rows } = await SupplyBatch.findAndCountAll({
            include: [
                { 
                    model: Supply, 
                    required: true,
                    include: [
                        { model: SupplyType, required: true },
                        { model: Stage, required: true }
                    ]
                },
            ],
            where: whereClause,
            offset: (page - 1) * size,
            limit: size,
            order: sort === 1 ? 
                [[Sequelize.col('Supply.nameSupply'), 'ASC']] : 
                [[Sequelize.col('Supply.nameSupply'), 'DESC']]
        });

        if (!rows || rows.length === 0) {
            return JsonResponse.error(404, "No se encontraron lotes de suministros.");
        }

        return JsonResponse.success({data:rows,totalItems:count}, "La petición ha sido un éxito.");
    } catch (error) {
        console.error("Error en searchSupplyBatch:", error);
        return JsonResponse.error(500, "Error interno al buscar lotes de suministros");
    }
}


}
export default SupplyBatchService;