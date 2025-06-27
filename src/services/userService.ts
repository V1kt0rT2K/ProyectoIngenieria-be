import { RegisterFormProps } from '../interfaces/Interface';
import User from '../models/userModel';
import UserRequest from '../models/userRequestModel';
import PersonService from './personService';
import UserRequestService from './userRequestService';
import sequelize from '../utils/connection';
import { Transaction } from 'sequelize';

var count =0;

class UserService {
    constructor() {}

    static async getAll() {
        console.log(User.findAll);
        return User.findAll();
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
        const login = await User.findOne({
            where: {
                email: email,
                password: password
            }
        });
        if (login == null) {
            throw new Error('Usuario o contraseña incorrectos');
        } else {
            console.log('Usuario logueado correctamente');
            console.log(login.getDataValue('idUser'));
            console.log(login instanceof User);
        }
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
}

export default UserService;