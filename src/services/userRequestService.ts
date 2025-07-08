import { Transaction } from "sequelize";
import UserRequest from "../models/userRequestModel";
import User from "../models/userModel";
import Status from "../models/statusModel";
import JsonResponse from "../utils/jsonResponse";
import sequelize from "../utils/connection";
import UserService from "./userService";
import Person from "../models/personModel";
import UserRole from "../models/userRoleModel";

class UserRequestService {
    constructor() {}

    static async getAllRequests(page:number, size:number, sort:number) {

        if(page <=0 ){
            page = 1;
        }
        if(size <= 0){
            size = 15;
        }
        if(sort != 0 && sort != 1){
            sort = 0;
        }

        const data = await UserRequest.findAll({
            include:[
                {
                    model: User, required: true,
                    include:[
                        {model: Person, required : true}
                    ]
                },
                {model: Status, required : true}
            ],
            order:[
                [User,Person,"firstName", sort == 0 ? "DESC" : "ASC"],
                [User,Person,"secondName", sort == 0 ? "DESC" : "ASC"],
                [User,Person,"lastName", sort == 0 ? "DESC" : "ASC"],
                [User,Person,"secondLastName", sort == 0 ? "DESC" : "ASC"]
            ],
            offset: (page-1) * size,
            limit: size
        });

        if(data.length === 0){
            return JsonResponse.error(400,"No existen datos.");
        }

        return JsonResponse.success(data, 'La petición ha sido un éxito.');
    }

    static async getUserRequestsByIdStatus(idStatus : number, page:number, size:number, sort:number) {

        let status = await Status.findByPk(idStatus);
        if(!status){
            return JsonResponse.error(400,"El estado seleccionado es inválido.");
        }

        if(page <=0 ){
            page = 1;
        }
        if(size <= 0){
            size = 15;
        }
        if(sort != 0 && sort != 1){
            sort = 0;
        }

        const data = await UserRequest.findAll({
            include:[
                {
                    model: User, required: true,
                    include:[
                        {model: Person, required : true}
                    ]
                },
                {model: Status, required : true},
                {model: UserRole,required:true}
            ],
            order:[
                [User,Person,"firstName", sort == 0 ? "DESC" : "ASC"],
                [User,Person,"secondName", sort == 0 ? "DESC" : "ASC"],
                [User,Person,"lastName", sort == 0 ? "DESC" : "ASC"],
                [User,Person,"secondLastName", sort == 0 ? "DESC" : "ASC"]
            ],
            offset: (page-1) * size,
            limit: size,
            where:{idStatus : idStatus}
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

    static async getUserRequestById(idUserRequest: number) {
        const data = await UserRequest.findByPk(idUserRequest,{
             include:[
                {
                    model: User, required: true,
                    include:[
                        {model: Person, required : true}
                    ]
                },
                {model: Status, required : true},
                {model: UserRole,required:true}
            ]
        });

        if(!data){
            return JsonResponse.error(400,"No existen datos.");
        }

        return JsonResponse.success(data,"La petición ha sido un éxito.");
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