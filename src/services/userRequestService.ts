import UserRequest from "../models/userRequestModel";
import { UserProps } from "../interfaces/Interface";
import User from "../models/userModel";

class UserRequestService {
    constructor(){}

    static async getAllRequest() {
        return await UserRequest.findAll();
    }

    static async createRequest(user: User, username: string) {
        return await UserRequest.create({
            idUser: user.idUser,
            idRole: user.idRole,
            idStatus: 2,
            userName: username,
            email: user.email,
            job: user.job
        });
    }
}

export default UserRequestService;