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
import Person from "../../models/users/personModel";
import Client from "../../models/sales/clientModel";
import { Op, Transaction } from "sequelize";
import UserRole from "../../models/users/userRoleModel";
import Notification from "../../models/assets/notificationModel";

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

    static async getSalesCheckById(idSalesCheck: number){

        const data = await SalesCheck.findByPk(idSalesCheck,{
                include:[
                    {model : Client, required : true},
                    {model : Product, required:true},
                    {model: CaiCodeRange, required: true, include:[
                        {model: CaiCode, required:true}
                    ]},
                    {model : User, required: true, include:[
                        {model:Person, required:true}
                    ]}
                ]
            });

        if(!data){
            return JsonResponse.error(400,"No se han encontrado datos.");
        }

        return JsonResponse.success(data,"La petición ha sido un éxito.");
    }
    

    static async generateSalesCheck(idUser: number | undefined,salesCheckProp : SalesCheckProp){
        
        //MANEJO DE ERRORES
        const user = await User.findByPk(idUser);
        if(!user)
            return JsonResponse.error(400,"No hay un usuario válido.");
        

        const client = await Client.findOne({
            where: {
                identification : salesCheckProp.identification
            }
        });

        if(!client)
            return JsonResponse.error(400, "Identificación de cliente no encontrada.");
        
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

        let salesCheckCode = await this.nextCaiCode(caiCodeRange);

        if(!salesCheckCode){
            return JsonResponse.error(500,"El rango no tiene valores válidos.");
        }

        const t = await sequelize.transaction();
        try{
            let subTotal = 0;
            let totalInStock = 0;

            for(let batchConsumption of salesCheckProp.consumption){

                const product = await Product.findByPk(batchConsumption.idProduct,{
                        transaction: t
                    });

                if(!product)
                    return JsonResponse.error(400,"Datos inválidos.");
        
                const batchList = await ProductBatch.findAll({
                    where: {
                        stockQuantity :{
                            [Op.gt] : 0
                        },
                        idProduct : batchConsumption.idProduct
                    },
                    order: [
                        ['expirationDate', 'ASC']
                    ],
                    transaction: t
                });

                if(batchList.length == 0){
                    await t.rollback();
                    return JsonResponse.error(400,`No existen lotes disponibles para el producto ${product.productName}.`);
                }

                totalInStock = 0;
                batchList.forEach((b) =>{
                    totalInStock += b.stockQuantity
                });

                if(totalInStock < batchConsumption.quantity){
                    await t.rollback();
                    return JsonResponse.error(400,`No hay suficientes existencias para el producto: ${product.productName}`);
                }

                let leftToConsume = batchConsumption.quantity;

                for(let b of batchList){

                    if(leftToConsume == 0)
                        break;

                    await ProductBatch.decrement("stockQuantity",{
                        by: ( leftToConsume < b.stockQuantity ? leftToConsume : b.stockQuantity),
                        where :{
                            idProductBatch : b.idProductBatch
                        },
                        transaction : t
                    });
                    leftToConsume -= leftToConsume < b.stockQuantity ? leftToConsume : b.stockQuantity;
                }

                subTotal += batchConsumption.quantity * product?.price;
            }

            const salesCheck = await SalesCheck.create({
                idUser: idUser,
                subTotal: subTotal,
                ISV: subTotal * 0.15,
                idClient : client.idClient,
                idCaiCodeRange : caiCodeRange.idCaiCodeRange,
                saleCheckCode : salesCheckCode,
                //generationDate : new Date().toDateString()
            }, { 
                transaction : t
            });
            
            await SalesChecksDetail.bulkCreate(
                salesCheckProp.consumption.map(e=>{
                    return {
                        idSalesCheck: salesCheck.idSalesCheck, 
                        idProduct: e.idProduct, 
                        quantity: e.quantity
                    }
                }),{
                    transaction: t
                }
            );

            //Generar notificaciones de puntos de reorden
            this.checkStockQuantity(salesCheckProp.consumption.map(e=>e.idProduct), t);

            await t.commit();
            //await t.rollback();

            const data = await this.getSalesCheckById(salesCheck.idSalesCheck);

            return JsonResponse.success(data.data, "La factura se ha creado con éxito.");
        }
        catch(err){
            console.log(err);
            await t.rollback();
            return JsonResponse.error(500, "Ha ocurrido un error.");
        }
    }

    private static async nextCaiCode(caiCodeRange : CaiCodeRange): Promise<string| null>{
        const numberSalesCheck = await SalesCheck.count({
            where:{
                idCaiCodeRange: caiCodeRange.idCaiCodeRange
            }
        });

        let startNumberCode = parseInt(caiCodeRange.startRange.substring(11)) + numberSalesCheck;
        let avaliableRange = parseInt(caiCodeRange.endRange.substring(11)) - startNumberCode + 1;

        if(avaliableRange == 0){
            return null;
        }

        return caiCodeRange.startRange.substring(0,11) + String(startNumberCode).padStart(8,"0");
    }

    static async checkStockQuantity( productList : number[], t: Transaction){

        const users = await User.findAll({
            where : {
                idRole : 3      /////ROL ENCARGADO DE ALMACEN
            }
        });

        if(users.length == 0)
            return;

        for(let p of productList){
            const product = await Product.findByPk(p);
            if(!product)
                return;

            const totalInStock = await ProductBatch.findAll({
                attributes:[
                    [sequelize.fn('SUM', sequelize.col('stockQuantity')), 'stockQuantity']
                ],
                where:{
                    idProduct : product.idProduct
                }
            });

            if(totalInStock[0].stockQuantity <= product.orderPoint){
                for(let user of users){
                    await Notification.create({
                        message : `El producto '${product.productName}' ha llegado a su punto de reorden.`,
                        idUser : user.idUser
                    });
                }
            }
        }

    }
        
}

export default SalesCheckService;