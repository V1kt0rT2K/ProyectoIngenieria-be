import CaiCodeRange from "../../models/sales/caiCodeRangeModel";
import JsonResponse from "../../utils/jsonResponse";
import { Op, Transaction } from "sequelize";
import sequelize from "../../utils/connection";
import CaiCode from "../../models/sales/caiCodeModel";

class CaiCodeService{

    static async generateNewRange(idCaiCode : number){
        const caiCode = await CaiCode.findByPk(idCaiCode);
        if(!caiCode)
            return JsonResponse.error(400,"No se ha encontrado el código CAI.");

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

        let oldEndRange = parseInt(caiCodeRange.endRange.substring(11));
        let newEndRange =oldEndRange + 15;


    }
}

export default CaiCodeService;
