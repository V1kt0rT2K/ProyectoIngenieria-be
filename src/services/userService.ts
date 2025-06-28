import { RegisterFormProps } from '../interfaces/Interface';
import User from '../models/userModel';
import UserRequest from '../models/userRequestModel';
import PersonService from './personService';
import UserRequestService from './userRequestService';
import sequelize from '../utils/connection';
import { Transaction } from 'sequelize';
import Person from '../models/personModel';
import UserRol from '../models/userRolModel';

var count = 0;

class UserService {
    constructor() {}

    static async getAll() {
        const users = await User.findAll({
            include: [
                { model: Person, required: true },
                { model: UserRol, required: true },
                { model: UserRequest, required: true }
            ],
            where: {
                isEnabled: 1
            }
        });

        return users.map((user: any) => ({
            id: user.dataValues.idUser,
            fullName: `${user.dataValues.Person.firstName} ${user.dataValues.Person.secondName} ${user.dataValues.Person.lastName} ${user.dataValues.Person.secondLastName}`,
            idNumber: user.dataValues.Person.identityNumber,
            role: user.dataValues.UserRol.roleName,
            date: user.dataValues.UserRequest.generationDate,
            email: user.dataValues.email,
            username: user.dataValues.UserRequest.userName
        }));
    }

    static async putisEnabled(idUser: number, isEnabled: boolean) {
        const user = await User.findByPk(idUser);
        if (user instanceof User) {
            user.setDataValue('isEnabled', isEnabled);
            await user.save();
            return user;
        } else {
            throw new Error('Usuario no encontrado');
        }
    }
    
    static async loginUser(email: string, password: string) {
        return await User.findOne({
            where: {
                email: email,
                password: password
            }
        });
    }

    static async createUser(user: {}, transaction: Transaction) {
        return await User.create(user, { transaction });
    }

    static async registerUser(form: RegisterFormProps) {
        try {
            await sequelize.transaction(async (t) => {
                const newPerson = await PersonService.createPerson({
                    firstName: form.firstName,
                    secondName: form.secondName,
                    lastName: form.lastName,
                    secondLastName: form.secondLastName,
                    identityNumber: form.identityNumber
                }, t);
    
                const newUser = await this.createUser({
                    email: form.email,
                    job: form.job,
                    password: form.password,
                    idPerson: newPerson.idPerson,
                    idRole: form.idRole
                }, t);
    
                const newRequest = await UserRequestService.createRequest({
                    idUser: newUser.idUser,
                    idRole: form.idRole,
                    idStatus: 2,
                    userName: form.username,
                    email: form.email,
                    job: form.job
                }, t);
    
                return newUser;
            });
        } catch (err) {
            throw err;
        }
    }

    static async getUserRequests(idUser: number){
        const user = await User.findByPk(idUser);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const requests = await UserRequest.findAll({
            where: {idUser: idUser}
        });

        if (requests.length === 0) {
            console.warn('El usuario no tiene solicitudes');
        }

        return requests;
    }

    static async updateUserStatus(idUser: number, isEnabled: boolean) {
        try {
            const user = await User.findByPk(idUser);

            if (!user) {
            throw new Error('Usuario no encontrado');
            }

        await user.update({ isEnabled });

        //user.isEnabled = isEnabled;
        //await user.save();

        return user;
        } catch (err) {
        throw err;
        }
    }

}

export default UserService;