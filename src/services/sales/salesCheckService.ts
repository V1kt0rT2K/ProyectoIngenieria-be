import SalesCheck from "../../models/sales/salesCheckModel";
import SalesChecksDetail from "../../models/sales/salesChecksDetailModel";
import SwineCutBatch from "../../models/stocks/swineCutBatchModel";
import SwineCutType from "../../models/stocks/swineCutTypeModel";
import { SalesCheckProp } from "../../utils/interfaces/Interface";
import UserService from "../users/userService";
import User from "../../models/users/userModel";
import JsonResponse from "../../utils/jsonResponse";
import sequelize from "../../utils/connection";
import StockPrice from "../../models/sales/stockPriceModel";
import CaiCodeRange from "../../models/sales/caiCodeRangeModel";
import CaiCode from "../../models/sales/caiCodeModel";



class SalesCheckService{

    static async getAll(){
        const data =  await SalesCheck.findAll({
            include: [
                { model : SwineCutBatch, required : true,
                    include:[
                        {model : SwineCutType, required : true}
                    ]
                }
            ]
        });

        if(data.length == 0){
            return JsonResponse.error(400,"No se han encontrado datos.");
        }

        return JsonResponse.success(data,"La petición ha sido un éxito.");
    }

    static async generateSalesCheck(salesCheckProp : SalesCheckProp){
        
        //MANEJO DE ERRORES
        const user = await UserService.getUserById(salesCheckProp.idUser);

        if(user.hasError){
            return user;
        }

        const caiCodeRange = await CaiCodeRange.findOne({
            where: {
                isActive : true
            },
            include:[
                {model:CaiCode, required:true}
            ]
        });

        if(!caiCodeRange){
            return JsonResponse.error(400,"No hay un código CAI válido.");
        }

        if(caiCodeRange.expirationDate <= new Date()){
            return JsonResponse.error(500,"Código Cai expirado.");
        }

        const numberSalesCheck = await SalesCheck.count({
            where:{
                idCaiCodeRange: caiCodeRange.idCaiCodeRange
            }
        });

        let startNumberCode = parseInt(caiCodeRange.startRange.substring(11)) + numberSalesCheck;
        let avaliableRange = parseInt(caiCodeRange.endRange.substring(11)) - startNumberCode;

        if(avaliableRange == 0){
            return JsonResponse.error(500,"El rango no tiene valores válidos.");
        }

        let caiCodeCheck = caiCodeRange.startRange.substring(0,11) + String(startNumberCode).padStart(8,"0");

        const t = await sequelize.transaction();
        try{

            let subTotal = 0;

            for(let batchConsumption of salesCheckProp.SwineCutBatchConsumption){
                let b = await SwineCutBatch.findByPk(batchConsumption.idSwineCutBatch,{
                    transaction: t
                });
                if(!b){
                    await t.rollback();
                    return JsonResponse.error(400,"El lote es inválido.");
                }
                if(b.isEmpty || b.quantity < batchConsumption.quantity){
                    await t.rollback();
                    return JsonResponse.error(400,"No hay suficientes existencias.");
                }

                let price = await StockPrice.findOne({
                    where:{
                        idSwineCutType : b.idSwineCutType
                    },
                    transaction: t
                });

                if(!price){
                    await t.rollback();
                    return JsonResponse.error(400,"Datos para venta inválidos.");
                }

                subTotal += batchConsumption.quantity * price.priceUnit;

                await SwineCutBatch.decrement("quantity", {
                    by: batchConsumption.quantity,
                    where: {
                        idSwineCutBatch : batchConsumption.idSwineCutBatch
                    },
                    transaction : t
                })
            }

            const salesCheck = await SalesCheck.create({
                idUser: salesCheckProp.idUser,
                subTotal: subTotal,
                ISV: subTotal * 0.15,
                idClient : salesCheckProp.idClient,
                idCaiCodeRange : caiCodeRange.idCaiCodeRange,
                saleCheckCode : caiCodeCheck,
                //generationDate : new Date().toDateString()
            }, { 
                transaction : t
            });
            
            const salesCheckDetails = await SalesChecksDetail.bulkCreate(
                salesCheckProp.SwineCutBatchConsumption.map(e=>{
                    return {
                        idSalesCheck: salesCheck.idSalesCheck, 
                        idSwineCutBatch: e.idSwineCutBatch, 
                        quantity: e.quantity
                    }
                }),{
                    transaction: t
                }
            );
            
            await t.commit();
            return JsonResponse.success(salesCheckDetails, "La factura se ha creado con éxito.");
        }
        catch(err){
            console.log(err);
            await t.rollback();
            return JsonResponse.error(500, "Ha ocurrido un error.");
        }
    }
}

export default SalesCheckService;