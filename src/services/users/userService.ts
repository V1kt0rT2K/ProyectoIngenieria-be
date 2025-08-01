import { RegisterFormProps } from '../../utils/interfaces/Interface';
import User from '../../models/users/userModel';
import UserRequest from '../../models/users/userRequestModel';
import {Op} from 'sequelize';
import PersonService from './personService';
import UserRequestService from './userRequestService';
import sequelize from '../../utils/connection';
import { Transaction } from 'sequelize';
import Person from '../../models/users/personModel';
import UserRole from '../../models/users/userRoleModel';
import JsonResponse from '../../utils/jsonResponse';


class UserService {
    static async getAll(page: number, size:number, sort: number) {

        if(page <=0){
            page = 1;
        }
        if(size <= 0){
            size = 15;
        }
        if(sort != 0 && sort != 1){
            sort = 0;
        }

        const totalItems =  await User.count({
            include:[
                {model: Person  , required : true},
                {model : UserRole, required : true},
            ]
        });

        const users = await User.findAll({
            include: [
                {model: Person  , required : true},
                {model : UserRole, required : true} 
            ],
            order:[
                [Person,"firstName", sort == 0 ? "DESC" : "ASC"],
                [Person,"secondName", sort == 0 ? "DESC" : "ASC"],
                [Person,"lastName", sort == 0 ? "DESC" : "ASC"],
                [Person,"secondLastName", sort == 0 ? "DESC" : "ASC"]
            ],
            offset: (page-1) * size,
            limit: size
        }); 

        if(users.length == 0){
            return JsonResponse.error(400,"No se han encontrado usuarios.");
        }

        return JsonResponse.success({data: users, totalItems: totalItems},'La petición se ha respondido con éxito.');
    }

    static async getUserById (idUser: number){
        const data = await User.findByPk(idUser,{
            include: [
                {model: Person, required:true},
                {model: UserRole, required : true}
                {model: UserRequest, required : true}
            ]
        });

        if(!data){
            return JsonResponse.error(400,"El usuario no existe.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }

    static async searchUsers(searchParam : string) {

        const users = await User.findAll({
            include: [
                {model: Person  , required : true},
                {model : UserRole, required : true}
            ],
            where:{
                [Op.or]: [
                    {'$Person.firstName$' : {[Op.like] : searchParam + "%"}},
                    sequelize.where(
                        sequelize.fn("CONCAT", sequelize.col("Person.firstName"),sequelize.col("Person.secondName")), 
                        Op.like , 
                        searchParam + "%"
                    ),
                    {"email" : {[Op.like] : searchParam+"%"}}
                ]
            }
        });

        if(users.length == 0){
            return JsonResponse.error(400,"No se han encontrado usuarios.");
        }

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
                const roleName = (await UserRole.findByPk(form.idRole))!.roleName;

                const newPerson = await PersonService.createPerson({
                    firstName: form.firstName,
                    secondName: form.secondName,
                    lastName: form.lastName,
                    secondLastName: form.secondLastName,
                    identityNumber: form.identityNumber
                }, t);

                const newUser = await this.createUser({
                    email: form.email,
                    job: form.job ?? roleName,
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
                    //job: form.job ?? "CCCCC"
                    job: form.job ?? roleName
                }, t);
            });
            return JsonResponse.success({},"Usuario registrado con éxito.");
        } catch (err) {
            console.log(err);
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
