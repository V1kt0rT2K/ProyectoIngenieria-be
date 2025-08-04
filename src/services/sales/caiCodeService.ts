import CaiCodeRange from "../../models/sales/caiCodeRangeModel";
import JsonResponse from "../../utils/jsonResponse";
import { Op, Transaction } from "sequelize";
import sequelize from "../../utils/connection";
import CaiCode from "../../models/sales/caiCodeModel";
import { start } from "repl";
import NotificationService from "../asset/notificationService";

class CaiCodeService{

    static async getAllRangesByActiveStatus(isActive : number,page:number, size:number, sort: number){

        if(page <=0){
            page = 1;
        }
        if(size <= 0){
            size = 15;
        }
        if(sort != 0 && sort != 1){
            sort = 0;
        }

        //// ISACTIVE = 2 PARA OBTENERLOS TODOS

        const {count ,rows} =  await CaiCodeRange.findAndCountAll({
            include: [
                {model : CaiCode, required : true}
            ],
            order:[
                ["expirationDate", sort == 0 ? "DESC" : "ASC"]
            ],
            where: {
                [Op.or]: [
                    {"isActive" : isActive},
                    isActive === 2 ? {"isActive" : {[Op.ne]: null}} : {}
                ]
            },
            distinct:true,
            offset: (page-1) * size,
            limit: size
        });

        if(rows.length == 0){
            return JsonResponse.error(400,"No se han encontrado datos.");
        }

        return JsonResponse.success({data:rows, totalItems: count},"La petición ha sido un éxito.");
    }

    static async generateNewRange(idCaiCode : number, newRange: number){
        const caiCode = await CaiCode.findByPk(idCaiCode);
        if(!caiCode)
            return JsonResponse.error(400,"No se ha encontrado el código CAI.");

        if(newRange <= 0 || newRange > 500)
            return JsonResponse.error(500,"Rango inválido.");

        const caiCodeRange = await CaiCodeRange.findOne({
            where: {
                idCaiCode : idCaiCode
            },
            order :[
                ["idCaiCodeRange", "DESC"]
            ]
        });
        if(!caiCodeRange)
            return JsonResponse.error(400,"No se ha encontrado el código CAI.");

        const activeCodes = await CaiCodeRange.count({
            where :{
                isActive : 1
            }
        });

        if(activeCodes >= 1)
            return JsonResponse.error(500,"Solo puede haber un código CAI activo a la vez.");
        
        let oldEndRange = parseInt(caiCodeRange.endRange.substring(11));

        const t = await sequelize.transaction();

        try{

            let currentDate = new Date();

            let expirationDate = new Date(currentDate.setMonth(currentDate.getMonth() + 2));

            await CaiCodeRange.create({
                startRange : caiCodeRange.startRange.substring(0,11) + String(oldEndRange + 1).padStart(8,"0"),
                endRange : caiCodeRange.startRange.substring(0,11) + String(oldEndRange + newRange).padStart(8,"0"),
                idCaiCode : caiCodeRange.idCaiCode,
                expirationDate : expirationDate.toISOString()

            },{
                transaction : t
            });

            ////MANDAR NOTIFICACIONES DE NUEVO RANGO A CAJEROS
            await NotificationService.sendNotificationByRole(2, 
                "Se ha generado un nuevo rango para emisión de facturas.",
                t
            );

            await t.commit();

            return JsonResponse.success({},"Codigo cai creado con éxito.");

        }catch(err){
            console.log(err);
            await t.rollback();
            return JsonResponse.error(500, "Ha ocurrido un error.");
        }
    }
}

export default CaiCodeService;
