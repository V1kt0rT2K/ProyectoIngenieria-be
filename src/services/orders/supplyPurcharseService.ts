import JsonResponse from "../../utils/jsonResponse";
import SupplyPurcharse from "../../models/orders/supplyPurcharseModel";
import Supply from "../../models/supplys/supplyModel";
import User from "../../models/users/userModel";
import Person from "../../models/users/personModel";
import Status from "../../models/assets/statusModel";
import { IncomingSupplyPurcharseProp, SupplyPurcharseProp } from "../../utils/interfaces/Interface";
import sequelize from "../../utils/connection";
import Provider from "../../models/orders/providerModel";
import SwineBatch from "../../models/stocks/swineBatchModel";
import SupplyPurcharseDetail from "../../models/orders/supplyPurcharseDetailModel";
import { Op, Transaction } from "sequelize";
import SupplyBatch from "../../models/supplys/supplyBatchModel";

class SupplyPurcharseService {
    static async getAllSupplyPurcharses(page: number, size: number, sort: number) {

        if(page <=0){
            page = 1;
        }
        if(size <= 0){
            size = 15;
        }
        if(sort != 0 && sort != 1){
            sort = 0;
        }

        const {count, rows} = await SupplyPurcharse.findAndCountAll({
            include: [
                {model : Supply, required: true},
                {model : Provider, required: true},
                {model: User, required: true, include: [
                    {model : Person , required :true}
                ]},
                {model : Status, required: true}
            ],
            order:[
                ["generationDate", sort == 0 ? "DESC" : "ASC"]
            ],
            offset: (page-1) * size,
            limit: size
        });

        if (rows.length === 0) {
            return JsonResponse.error(400, "No existen proveedores.");
        }

        return JsonResponse.success({data: rows, totalItems: count}, "La petición ha sido un éxito.");
    }

    static async getAllSupplyPurcharsesByIdStatus(page: number, size: number, sort: number, idStatus: number) {

        if(page <=0){
            page = 1;
        }
        if(size <= 0){
            size = 15;
        }
        if(sort != 0 && sort != 1){
            sort = 0;
        }

        const {count, rows} = await SupplyPurcharse.findAndCountAll({
            include: [
                {model : Supply, required: true},
                {model: User, required: true, include: [
                    {model : Person , required :true}
                ]},
                {model : Status, required: true}
            ],
            where : {
                [Op.or]: [
                    {idStatus : idStatus},
                    idStatus === 0 ? {idStatus : {[Op.ne]: null}} : {}
                ]
            },
            order:[
                ["generationDate", sort == 0 ? "DESC" : "ASC"]
            ],
            offset: (page-1) * size,
            limit: size
        });

        if (rows.length === 0) {
            return JsonResponse.error(400, "No existen proveedores.");
        }

        return JsonResponse.success({data: rows, totalItems: count}, "La petición ha sido un éxito.");
    }

    static async getSupplyPurcharseById(idSupplyPurcharse: number) {
        const data = await SupplyPurcharse.findByPk(idSupplyPurcharse, {
            include: [
								{model : Supply, required: true},
                {model : Provider, required: true},
                {model: User, required: true, include: [
                    {model : Person , required :true}
                ]},
                {model : Status, required: true}
            ]
        });

        if(!data)
            return JsonResponse.error(400,"No se han encontrado datos.");

        return JsonResponse.success(data, "La petición se ha realizado con éxito.");
    }

    static async generatePurcharse(idUser : number | undefined,supplyPurcharseProp : SupplyPurcharseProp){
         //MANEJO DE ERRORES
        const user = await User.findByPk(idUser);
        if(!user)
            return JsonResponse.error(400,"No hay un usuario válido.");

        const provider = await Provider.findByPk(supplyPurcharseProp.idProvider);
        if(!provider)
            return JsonResponse.error(400,"No hay un proveedor válido.");

        const t = await sequelize.transaction();
        try{
            let subTotal = 0;

            for(let s of supplyPurcharseProp.detail){

                const supply = await Supply.findByPk(s.idSupply,{
                    transaction : t
                });

                if(!supply){
                    await t.rollback();
                    return JsonResponse.error(400,"Datos inválidos.");
                }

                subTotal += supply.price * s.quantity;
            }

            const purcharse = await SupplyPurcharse.create({
                idUser : idUser,
                idProvider : supplyPurcharseProp.idProvider,
                subTotal : subTotal,
                ISV : subTotal * 0.15
            },{
                transaction : t
            });

            await SupplyPurcharseDetail.bulkCreate(
                supplyPurcharseProp.detail.map(e=>{
                    return {
                        idSupplyPurcharse: purcharse.idSupplyPurcharse, 
                        idSupply: e.idSupply, 
                        quantity: e.quantity
                    }
                }),{
                    transaction: t
                }
            );

            await t.commit();

            const data = await this.getSupplyPurcharseById(purcharse.idSupplyPurcharse);

            return JsonResponse.success(data.data, "La petición se ha realizado con éxito.");

        }catch(err){
            await t.rollback();
            console.log(err);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }

    static async enterSupplyPurcharse(idUser: number | undefined,incomingSupplyPurcharseProp: IncomingSupplyPurcharseProp){
        //MANEJO DE ERRORES
        const user = await User.findByPk(idUser);
        if(!user)
            return JsonResponse.error(400,"No hay un usuario válido.");

        const purcharse = await SupplyPurcharse.findByPk(incomingSupplyPurcharseProp.idSupplyPurcharse);
        if(!purcharse)
            return JsonResponse.error(400,"No se ha encontrado la orden de compra.");

        if(purcharse.idStatus !== 5){   //Estado Por Ingresar
            return JsonResponse.error(403, "La orden de compra aún no se ha recibido.");
        }        

        const t = await sequelize.transaction();
        try{
            if(incomingSupplyPurcharseProp.isModified){///Si fue modificado se debe crear una nueva

                let subTotal = 0;
                for(let s of incomingSupplyPurcharseProp.detail){

                    const supply = await Supply.findByPk(s.idSupply,{
                        transaction : t
                    });

                    if(!supply){
                        await t.rollback();
                        return JsonResponse.error(400,"Datos inválidos.");
                    }

                    subTotal += supply.price * s.quantity;
                }

                const newPurcharse = await SupplyPurcharse.create({
                    idUser : idUser,
                    idProvider : purcharse.idProvider,
                    subTotal : subTotal,
                    ISV : subTotal * 0.15,
                    idFormerPurcharse: purcharse.idSupplyPurcharse,
                    idStatus : 6        //Ingresado
                },{
                    transaction : t
                });

                await SupplyPurcharseDetail.bulkCreate(
                    incomingSupplyPurcharseProp.detail.map(e=>{
                        return {
                            idSupplyPurcharse: newPurcharse.idSupplyPurcharse, 
                            idSupply: e.idSupply, 
                            stockQuantity: e.quantity
                        }
                    }),{
                        transaction: t
                    }
                );

                await SupplyPurcharse.update({
                    idStatus : 7        //Cancelado
                }, {
                    where: {
                        idSupplyPurcharse: purcharse.idSupplyPurcharse
                    },
                    transaction : t
                });

                await this.addEntriesToStock(newPurcharse.idSupplyPurcharse, t);
            }else{
                await SupplyPurcharse.update({
                    idStatus : 6
                },{
                    where:{
                        idSupplyPurcharse : purcharse.idSupplyPurcharse
                    },
                    transaction : t
                });

                await this.addEntriesToStock(purcharse.idSupplyPurcharse, t);
            }

            await t.commit();
            return JsonResponse.success({}, "La orden de compra se ha ingresado con éxito.");
        }catch(err){
            await t.rollback();
            console.log(err);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }

    private static async addEntriesToStock(idSupplyPurcharse: number, t : Transaction) : Promise<boolean>{
        const detail = await SupplyPurcharseDetail.findAll({
            where : {
                idSupplyPurcharse : idSupplyPurcharse
            },
            transaction : t
        });
        if(!detail)
            return false;

        for(let d of detail){
            await SupplyBatch.create({
                idSupply : d.idSupply,
                stockQuantity : d.quantity,
                expirationDate : new Date().toISOString()       ////AGREGAR FECHA DE EXPIRACION
            },{
                transaction : t
            });
        }

        return true;
    }
}

export default SupplyPurcharseService;
