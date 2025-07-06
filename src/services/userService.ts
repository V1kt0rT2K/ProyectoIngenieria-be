import { RegisterFormProps } from '../utils/interfaces/Interface';
import User from '../models/userModel';
import UserRequest from '../models/userRequestModel';
import PersonService from './personService';
import UserRequestService from './userRequestService';
import sequelize from '../utils/connection';
import { Transaction } from 'sequelize';
import Person from '../models/personModel';
import UserRole from '../models/userRoleModel';
import JsonResponse from '../utils/jsonResponse';

class UserService {
    constructor() { }

    static async getAll() {
        const users = await User.findAll({
            include: [
                {model: Person  , required : true},
                {model : UserRole, required : true},
                {model: UserRequest}
            ]
        });

        return JsonResponse.success(users,'La petición se ha respondido con éxito.');
    }

    static async updateEnabledStatus(idUser: number, enabled: boolean) {

        let user = await User.findByPk(idUser);
        if(!user){
            return JsonResponse.error(400,"El usuario no existe.");
        }

        try {
            await sequelize.transaction(async (t) => {
                await User.update(
                    { isEnabled: enabled },
                    {
                        where: { idUser: idUser },
                        transaction: t
                    }
                );
            });

            return JsonResponse.success({},"El usuario ha sido modificado con éxito.");
        } catch (err) {
            console.log(err);
            return JsonResponse.error(500, "Ha ocurrido un error.");
        }
    }
    static async getUserByEmail(email: string) {

        const data = await User.findOne({
            where:{email: email} 
        }); 

        if(!data){
            return JsonResponse.error(400,"El usuario no existe.");
        }

        return JsonResponse.success(data,"La petición ha sido un éxito.");
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
            });
            return JsonResponse.success({},"Usuario registrado con éxito.");
        } catch (err) {
            return JsonResponse.error(500, "Usuario no registrado.");
        }
    }
    

    static async updateUser(idUser: number, values: any) {

        const user = await User.findByPk(idUser);

        if (!user) {
            return JsonResponse.error(400,"El usuario no existe.");
        }

        try {
            await sequelize.transaction(async (t) => {
            
                await User.update(
                    {
                        email: values.email,
                        idRole: values.role,
                        isEnabled: values.enabled
                    },
                    {
                        where: { idUser: idUser },
                        transaction: t
                    }
                );

                const idPerson = user.idPerson;

                await Person.update(
                    {
                        firstName: values.firstName,
                        secondName: values.secondName,
                        lastName: values.lastName,
                        secondLastName: values.secondLastName,
                        identityNumber: values.identityNumber
                    },
                    {
                        where: { idPerson: idPerson },
                        transaction: t
                    }
                );
                // await UserRequest.update(
                //     {
                //         userName: values.username
                //     },
                //     {
                //         where: { idUser: idUser },
                //         transaction: t
                //     }
                // );
            });

            return JsonResponse.success({}, "Usuario actualizado con éxito.");
        } catch (err) {
            console.log(err);
            return JsonResponse.error(500, "No se actualizo ningun usuario");
        }
    }
}

export default UserService;
