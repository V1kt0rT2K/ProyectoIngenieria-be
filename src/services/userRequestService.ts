import { Transaction } from "sequelize";
import UserRequest from "../models/userRequestModel";

class UserRequestService {
    constructor(){}

    static async getAllRequest() {
        return await UserRequest.findAll();
    }

    static async createRequest(request: {}, transaction: Transaction) {
        return await UserRequest.create(request, { transaction });
    }
}

export default UserRequestService;