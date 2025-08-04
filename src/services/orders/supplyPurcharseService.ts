import JsonResponse from "../../utils/jsonResponse";
import SupplyPurcharse from "../../models/orders/supplyPurcharseModel";
import Supply from "../../models/supplys/supplyModel";
import User from "../../models/users/userModel";
import Person from "../../models/users/personModel";
import Status from "../../models/assets/statusModel";
import { IncomingSupplyPurcharseProp, SupplyPurcharseProp } from "../../utils/interfaces/Interface";
import sequelize from "../../utils/connection";
import Provider from "../../models/orders/providerModel";
import SupplyPurcharseDetail from "../../models/orders/supplyPurcharseDetailModel";
import { Op, Transaction, where } from "sequelize";
import SupplyBatch from "../../models/supplys/supplyBatchModel";
import NotificationService from "../asset/notificationService";

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
                //{model : Supply, required: true},
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
                //{model : Supply, required: true},
                {model : Provider, required: true},
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
            return JsonResponse.error(400, "No existen datos.");
        }

        return JsonResponse.success({data: rows, totalItems: count}, "La petición ha sido un éxito.");
    }

    static async getSupplyPurcharseById(idSupplyPurcharse: number) {
        const data = await SupplyPurcharse.findByPk(idSupplyPurcharse, {
            include: [
                { model : SupplyPurcharse, as:"FormerSupplyPurcharse" , include: [
                    {model : Supply, required:true}
                ]},
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

        if(new Set(supplyPurcharseProp.detail.
            map(d => d.idSupply)).size < supplyPurcharseProp.detail.length)
                return JsonResponse.error(500, "Solo se debe ingresar un insumo por categoria.");

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

            ///CREAR NOTIFICACION DE ORDEN DE COMPRA GENERADA
            ///PARA ROL DE ADMINISTRADOR
            await NotificationService.sendNotificationByRole( 1,
                `El usuario ${user.email} ha generado una nueva orden de compra con código ${purcharse.idSupplyPurcharse}.`, 
                t
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
            return JsonResponse.error(403, "La orden de compra no esta por ingresarse.");
        }        
        
        ////VERIFICAR SI LA COMPRA FUE MODIFICADA A LA HORA DE INGRESARSE

        let isModified = await this.verifyPurcharseDetails(purcharse.idSupplyPurcharse,incomingSupplyPurcharseProp.detail);
        console.log("detail", incomingSupplyPurcharseProp.detail);

        const t = await sequelize.transaction();
        try{
            if(isModified){///Si fue modificado se debe crear una nueva

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
                    idFormerSupplyPurcharse: purcharse.idSupplyPurcharse,
                    idStatus : 6        //Ingresado
                },{
                    transaction : t
                });

                await SupplyPurcharseDetail.bulkCreate(
                    incomingSupplyPurcharseProp.detail.map(e=>{
                        return {
                            idSupplyPurcharse: newPurcharse.idSupplyPurcharse, 
                            idSupply: e.idSupply, 
                            quantity: e.quantity
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

                const entry = await this.addEntriesToStock(newPurcharse.idSupplyPurcharse,
                    incomingSupplyPurcharseProp.detail, 
                    t);
                if(!(entry === true)){
                    await t.rollback();
                    return JsonResponse.error(500,`${entry}`);
                }
            }else{
                await SupplyPurcharse.update({
                    idStatus : 6
                },{
                    where:{
                        idSupplyPurcharse : purcharse.idSupplyPurcharse
                    },
                    transaction : t
                });

                const entry = await this.addEntriesToStock(purcharse.idSupplyPurcharse,
                    incomingSupplyPurcharseProp.detail, 
                    t);
                if(!(entry === true)){
                    await t.rollback();
                    return JsonResponse.error(500,`${entry}`);
                }
            }

            await t.commit();
            return JsonResponse.success({}, "La orden de compra se ha ingresado con éxito.");
        }catch(err){
            await t.rollback();
            console.log(err);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }

    private static async addEntriesToStock(idSupplyPurcharse: number,expirationDates:{idSupply: number,expirationDate:Date}[], t : Transaction) : Promise<boolean | string>{
        const detail = await SupplyPurcharseDetail.findAll({
            where : {
                idSupplyPurcharse : idSupplyPurcharse
            },
            transaction : t
        });
        if(!detail)
            return "No existe el detalle de la orden seleccionada.";

        for(let d of detail){
            let supplyExpirationDate = expirationDates.find(date => date.idSupply === d.idSupply)?.expirationDate;

            console.log("supplyExpirationDate", supplyExpirationDate);

            console.log("isValid", !supplyExpirationDate);

            if(!supplyExpirationDate || isNaN(new Date(supplyExpirationDate).getDate()))
                return "Fecha de expiración ingresada inválida";

            await SupplyBatch.create({
                idSupply : d.idSupply,
                stockQuantity : d.quantity,
                expirationDate : new Date(supplyExpirationDate).toISOString()

            },{
                transaction : t
            });
        }

        return true;
    }

    static async verifyPurcharseDetails(idSupplyPurcharse: number, detail : {idSupply:number, quantity:number, expirationDate:Date}[]): Promise<boolean> {

        const purcharseDetail = await SupplyPurcharseDetail.findAll({
            attributes : [
                "idSupply", "quantity"
            ],
            where :{
                idSupplyPurcharse : idSupplyPurcharse
            }
        });

        if (purcharseDetail.length !== detail.length) return true;

        const sortedA = [...purcharseDetail].sort((x, y) => x.idSupply - y.idSupply);
        const sortedB = [...detail].sort((x, y) => x.idSupply - y.idSupply);

        return !(sortedA.every((item, index) => 
            item.idSupply === sortedB[index].idSupply && 
            item.quantity === sortedB[index].quantity
        ));

    }

    static async updatePurcharseStatus(idSupplyPurcharse : number, idStatus : number): Promise<JsonResponse>{

        // const allowedStatus = await Status.findAll({
        //     where : {
        //         [Op.or] : [
        //             {idStatusType : 2},
        //             {idStatus : 1}
        //         ]
        //     }
        // });

        const purcharse = await SupplyPurcharse.findByPk(idSupplyPurcharse);
        if(!purcharse)
            return JsonResponse.error(500,"La orden de compra ingresada no existe.");

        // if(!(allowedStatus.find((s) => s.idStatus === idStatus)))
        //     return JsonResponse.error(500, "Estado ingresado no válido.");

        ////VALIDACION DE LOS ESTADOS
        if(purcharse.idStatus == 1){        ////APROBADO
            if(idStatus != 7 && idStatus != 4)
                return JsonResponse.error(500, "La orden no esta en camino.");
        }else if(purcharse.idStatus == 2){  ///REVISION
            return JsonResponse.error(500, "La orden aún esta en revisión.");
        }else if(purcharse.idStatus == 3){   ///DENEGADO
            return JsonResponse.error(500, "La orden esta denegada.");
        }else if(purcharse.idStatus == 4){   //EN CAMINO
            if(idStatus != 5 && idStatus != 7)
                return JsonResponse.error(500, "La orden esta en camino.");
        }else if(purcharse.idStatus == 5){  //POR INGRESAR  NO SE DEBE ACTUALIZAR CON ESTE SERVICIO
            return JsonResponse.error(500, "Acción inválida, debe ingresar inventarios a sistema.");
        }else if(purcharse.idStatus == 6){  //INGRESADO 
            return JsonResponse.error(500, "La orden ya fue ingresada.");
        }else if(purcharse.idStatus == 7){   //CANCELADO
            return JsonResponse.error(500, "La orden fue cancelada.");
        }

        const t = await sequelize.transaction();
        try{

            await SupplyPurcharse.update({
                idStatus : idStatus
            },{
                where :{
                    idSupplyPurcharse: purcharse.idSupplyPurcharse
                }, 
                transaction : t
            });

            await t.commit();

            return JsonResponse.success({},"La orden de compra se ha actualizado con éxito.");

        }catch(err){
            await t.rollback();
            console.log(err);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }

    static async approveOrRejectSupplyPurcharse(idSupplyPurcharse: number, idStatus : number){

        const avaliableStatus = await Status.findAll({
            where : {
                idStatusType : 1
            }
        });

        if(!(avaliableStatus.find((s) => s.idStatus === idStatus)) || idStatus == 2)
            return JsonResponse.error(500, "Estado ingresado no válido.");

        const purcharse = await SupplyPurcharse.findByPk(idSupplyPurcharse);
        if(!purcharse)
            return JsonResponse.error(400, "Orden no encontrada.");

        if(purcharse.idStatus != 2)
            return JsonResponse.error(500,"La orden ya fue gestionada.");

        const t = await sequelize.transaction();
        try{

            await SupplyPurcharse.update({
                idStatus : idStatus
            },{
                where :{
                    idSupplyPurcharse: idSupplyPurcharse
                }, 
                transaction : t
            });

            await NotificationService.sendNotificationByRole(3,
                `La orden de compra con código ${purcharse.idSupplyPurcharse} ha sido ${idStatus == 1 ? "aprobada": "denegada"}.`,
                t
            );

            await t.commit();

            return JsonResponse.success({},"La orden de compra se ha actualizado con éxito.");

        }catch(err){
            await t.rollback();
            console.log(err);
            return JsonResponse.error(500, "Error Interno del Servidor.");
        }
    }
}

export default SupplyPurcharseService;
