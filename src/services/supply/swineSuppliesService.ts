import JsonResponse from "../../utils/jsonResponse";
import SwineSupply from "../../models/supplys/swineSupplyModel";
import SwineBatch from "../../models/stocks/swineBatchModel";
import Supply from "../../models/supplys/supplyModel";
import SupplyType from "../../models/supplys/supplyTypeModel";
import SupplyBatchService from "./supplyBatchService";
import User from "../../models/users/userModel";
import Person from "../../models/users/personModel";
import sequelize from "../../utils/connection";
import SupplyBatch from "../../models/supplys/supplyBatchModel";
import { IncomingSwineSupplyProp } from "../../utils/interfaces/Interface";
class SwineSupplyService {
    constructor() {}

    static async getAllSwineSupply() {
        const data = await SwineSupply.findAll({
        include: [
            {
                model: SwineBatch,
                required: true,
                
            },{
                model:Supply,
                required: true
            },
            {
                model: User,
                required: true
            }]
        });

        if (!data || data.length === 0) {
            return JsonResponse.error(400, "No existen suministros de cerdos.");
        }
        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }
    static async getAllSwineSupplybyidSwineBatch(idSwineBatch: number) {
        const data = await SwineSupply.findAll({
            
        include: [
            {
                model: SwineBatch,
                required: true,
                
            },{
                model:Supply,
                required: true,
                include: [
                            { model: SupplyType, required: true}
                        ]
            },
            {
                model: User,
                required: true,
                include:[
                    {model:Person, required:true}
                ]
            }],
            where:  {idSwineBatch : idSwineBatch},
        });

        if (!data || data.length === 0) {
            return JsonResponse.error(400, "No existen suministros de cerdos.");
        }
        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }
   static async createSwineSupply(payload: IncomingSwineSupplyProp) {
    const t = await sequelize.transaction();
    
    try {
        if (payload.quantityNeeded <= 0) {
            return JsonResponse.error(400, "La cantidad necesaria debe ser mayor a cero.");
        }

        // 2. Obtener lotes de insumos 
        const supplyIds = payload.detail.map(d => d.idSupply);
        const supplyBatches = await SupplyBatch.findAll({
            where: { idSupply: supplyIds },
            order: [['expirationDate', 'ASC']],
            transaction: t,
            lock: t.LOCK.UPDATE
        });
    

        // 3. Verificar y reservar stock
        const stockMap = new Map<number, number>();
        const validBatches = supplyBatches.filter(b => b.stockQuantity > 0);

    for (const batch of validBatches) {
    const currentStock = stockMap.get(batch.idSupply) || 0;
    stockMap.set(batch.idSupply, currentStock + batch.stockQuantity);
    }
    

        for (const item of payload.detail) {
            const availableStock = stockMap.get(item.idSupply) || 0;
            if (availableStock < item.quantity) {
                await t.rollback();
                return JsonResponse.error(400, `Stock insuficiente para insumo ${item.idSupply}`);
            }
        }

        // 4. Actualizar lotes (FIFO)
            for (const item of payload.detail) {
                let remaining = item.quantity;
                
                // Solo filtrar - sin volver a ordenar
                const batches = supplyBatches.filter(b => b.idSupply === item.idSupply);

                for (const batch of batches) {
                    if (remaining <= 0) break;
                    
                    if (batch.stockQuantity <= 0) continue; // Saltar lotes sin stock

                    const discount = Math.min(batch.stockQuantity, remaining);
                    await batch.update({
                        stockQuantity: batch.stockQuantity - discount
                    }, { transaction: t });
                    
                    remaining -= discount;
                }

                if (remaining > 0) {
                    throw new Error(`No se pudo cubrir la cantidad completa para insumo ${item.idSupply}. Faltan ${remaining} unidades`);
                }
            }
        // 5. Crear registros de suministro
        const createdSupplies = [];
        for (const detail of payload.detail) {
            const newSupply = await SwineSupply.create({
                idSwineBatch: payload.idSwineBatch,
                idSupply: detail.idSupply,
                quantity: detail.quantity,
                generationDate: detail.generationDate,
                idUser: payload.idUser
            }, { transaction: t });
            createdSupplies.push(newSupply);
        }

        await t.commit();
        return JsonResponse.success(createdSupplies, "Suministro creado exitosamente");
        
    } catch (error) {
        await t.rollback();
        return JsonResponse.error(400, "erro interno del Sevidor");
    }
}
    
    
}
export default SwineSupplyService;