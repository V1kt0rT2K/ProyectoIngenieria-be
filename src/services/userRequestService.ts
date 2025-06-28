import { Transaction } from "sequelize";
import UserRequest from "../models/userRequestModel";
import sequelize from "../utils/connection";

class UserRequestService {
    constructor() {
        
    }

    static async getAllRequests() {
        const [results, _] = await sequelize.query(
            'select * '
            + 'from ProyectoIngenieria.users.tblUserRequests A '
            + 'inner join ProyectoIngenieria.users.tblUsers B '
            + 'on A.idUser = B.idUser '
            + 'inner join ProyectoIngenieria.users.tblPersons C '
            + 'on C.idPerson = B.idPerson '
            + 'inner join ProyectoIngenieria.users.tblUserRoles D '
            + 'on D.idRole = B.idRole '
            + 'where A.idStatus = 2'
        );

        return results.map((request: any) => ({
            id: request.idUser,
            fullName: `${request.firstName} ${request.secondName} ${request.lastName} ${request.secondLastName}`,
            idNumber: request.identityNumber,
            role: request.roleName,
            date: request.generationDate,
            email: request.email
        }));
    }

    static async createRequest(request: {}, transaction: Transaction) {
        return await UserRequest.create(request, { transaction });
    }
}

export default UserRequestService;