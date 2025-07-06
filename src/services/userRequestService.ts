import { Transaction } from "sequelize";
import UserRequest from "../models/userRequestModel";
import sequelize from "../utils/connection";
import User from "../models/userModel";
import Status from "../models/statusModel";
import JsonResponse from "../utils/jsonResponse";

class UserRequestService {
    constructor() {
        
    }

    static async getAllRequests() {

        const data = UserRequest.findAll({
            include:[
                {model: User, required: true},
                {model: Status, required : true}
            ],
            where: {
                idStatus: 2
            }
        });
        //console.log("Ejecutado");

        return JsonResponse.success(data, 'La petición ha sido un éxito.');
    }

    static async getUserRequestsByIdUser(idUser: number) {
        const user = await User.findByPk(idUser);

        if (!user) {
            return JsonResponse.error(404,'El usuario no existe.');
        }

        const requests = await UserRequest.findAll({
            where: { idUser: idUser }
        });

        if (requests.length === 0) {
            return JsonResponse.error(404, "El usuario no tiene solicitudes.");
        }

        return JsonResponse.success(requests,"La petición ha sido un éxito.");
    }

    static async createRequest(request: {}, transaction: Transaction) {
        return await UserRequest.create(request, { transaction });
    }
}

export default UserRequestService;