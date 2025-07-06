import { Transaction } from "sequelize";
import UserRequest from "../models/userRequestModel";
import User from "../models/userModel";
import Status from "../models/statusModel";
import JsonResponse from "../utils/jsonResponse";
import sequelize from "../utils/connection";
import UserService from "./userService";

class UserRequestService {
    constructor() {}

    static async getAllRequests() {

        const data = await UserRequest.findAll({
            include:[
                {model: User, required: true},
                {model: Status, required : true}
            ],
            where: {
                idStatus: 2
            }
        });

        if(data.length === 0){
            return JsonResponse.error(400,"No existen datos.");
        }

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

    static async manageUserRequest(idUserRequest: number, idStatus: number) {

        let status = await Status.findByPk(idStatus);
        if(!status || idStatus == 2){
            return JsonResponse.error(400, "El estado no es válido.");
        }

        const userRequest = await UserRequest.findByPk(idUserRequest);

        if(!userRequest){
            return JsonResponse.error(400, "La solicitud no existe.");
        }
        if(userRequest.idStatus != 2){
            return JsonResponse.error(400, "La solicitud no se encuentra en revisión.");
        }
        
        try{
            await sequelize.transaction( async (t) => {
                await UserRequest.update(
                    {idStatus : idStatus},
                    {
                        where: {idUserRequest : idUserRequest}
                    }
                );

                let enabled = idStatus === 1;
                
                await UserService.updateEnabledStatus(userRequest.idUser,enabled);
            });

            return JsonResponse.success({},"La petición ha sido un éxito.");
        }catch(error){
            console.log(error);
            return JsonResponse.error(500, "No se ha podido completar la solicitud.");
        }
    }

    static async createRequest(request: {}, transaction: Transaction) {
        return await UserRequest.create(request, { transaction });
    }
}

export default UserRequestService;