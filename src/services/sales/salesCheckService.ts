import SalesCheck from "../../models/sales/salesCheckModel";
import SalesChecksDetail from "../../models/sales/salesChecksDetailModel";
import { SalesCheckProp } from "../../utils/interfaces/Interface";
import UserService from "../users/userService";
import User from "../../models/users/userModel";
import JsonResponse from "../../utils/jsonResponse";
import sequelize from "../../utils/connection";
import CaiCodeRange from "../../models/sales/caiCodeRangeModel";
import CaiCode from "../../models/sales/caiCodeModel";
import ProductBatch from "../../models/stocks/productBatchModel";
import Product from "../../models/stocks/productModel";



class SalesCheckService{

    static async getAll(){
        const data =  await SalesCheck.findAll({
            include: [
                {model : Product, required:true}
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
                let b = await ProductBatch.findByPk(batchConsumption.idProduct,{
                    transaction: t
                });
                if(!b){
                    await t.rollback();
                    return JsonResponse.error(400,"El lote es inválido.");
                }
                if(b.stockQuantity < batchConsumption.quantity){
                    await t.rollback();
                    return JsonResponse.error(400,"No hay suficientes existencias.");
                }

                let price = await Product.findOne({
                    where:{
                        idProduct : b.idProduct
                    },
                    transaction: t
                });

                if(!price){
                    await t.rollback();
                    return JsonResponse.error(400,"Datos para venta inválidos.");
                }

                subTotal += batchConsumption.quantity * price.price;

                await ProductBatch.decrement("stockQuantity", {
                    by: batchConsumption.quantity,
                    where: {
                        idProduct : batchConsumption.idProduct
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
                        idProduct: e.idProduct, 
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