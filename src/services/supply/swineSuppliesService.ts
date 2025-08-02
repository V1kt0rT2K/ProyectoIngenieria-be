import JsonResponse from "../../utils/jsonResponse";
import SwineSupply from "../../models/supplys/swineSupplyModel";
import SwineBatch from "../../models/stocks/swineBatchModel";
import Supply from "../../models/supplys/supplyModel";
import SupplyType from "../../models/supplys/supplyTypeModel";
import User from "../../models/users/userModel";
import Person from "../../models/users/personModel";
import sequelize from "../../utils/connection";
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
    static async createSwineSupply(IncomingSwineSupplyProp:IncomingSwineSupplyProp) {
        try{
            if(!IncomingSwineSupplyProp.idSwineBatch || !IncomingSwineSupplyProp.idSupply || !IncomingSwineSupplyProp.quantity || !IncomingSwineSupplyProp.generationDate || !IncomingSwineSupplyProp.idUser){
                return JsonResponse.error(400, "Faltan datos requeridos.");
            }
            const t= await sequelize.transaction();
            try{
                const newSwineSupply = await SwineSupply.create({
                idSwineBatch: IncomingSwineSupplyProp.idSwineBatch,
                idSupply: IncomingSwineSupplyProp.idSupply,
                quantity: IncomingSwineSupplyProp.quantity,
                generationDate: IncomingSwineSupplyProp.generationDate,
                idUser: IncomingSwineSupplyProp.idUser
            }, { transaction: t });
            await t.commit();
            return JsonResponse.success(newSwineSupply, "Suministro de cerdo creado exitosamente.");
            }catch (error) {
                await t.rollback();
                console.error('Error al crear el suministro de cerdo:', error);
                return JsonResponse.error(500, "Error al crear el suministro de cerdo.");
            }
        }catch (error) {
            console.error(error);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }
    
}
export default SwineSupplyService;