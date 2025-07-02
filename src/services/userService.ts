import { RegisterFormProps } from '../interfaces/Interface';
import User from '../models/userModel';
import UserRequest from '../models/userRequestModel';
import PersonService from './personService';
import UserRequestService from './userRequestService';
import sequelize from '../utils/connection';
import { Transaction } from 'sequelize';
import UserRolesHistoric from '../models/userRolesHistoricModel';
import Person from '../models/personModel';
import UserRol from '../models/userRolModel';
import JsonResponse from '../utils/jsonResponse';
import e from 'express';

//var count = 0;
const failedattempts= new Map<string, number>();
const userlock = new Map<string, Date>(); 


class UserService {
    constructor() { }

    static async getAll() {
        const users = await User.findAll({
            include: [
                { model: Person, required: true },
                { model: UserRol, required: true },
                {
                    model: UserRequest,
                    required: true,
                }
            ]
        });
        console.log(users[1].getDataValue('password'));
        return users.map((user: any) => ({
            id: user.dataValues.idUser,
            firstName: user.dataValues.Person.firstName,
            secondName: user.dataValues.Person.secondName,
            lastName: user.dataValues.Person.lastName,
            secondLastName: user.dataValues.Person.secondLastName,
            idNumber: user.dataValues.Person.identityNumber,
            idRole: user.dataValues.idRole,
            roleName: user.dataValues.UserRol.roleName,
            date: user.dataValues.UserRequest.generationDate,
            email: user.dataValues.email,
            username: user.dataValues.UserRequest.userName,
            enabled: user.dataValues.isEnabled
        }));
    }

    static async putIsEnabled(id: number, enabled: boolean, status?: number) {
        let affected;

        try {
            await sequelize.transaction(async (t) => {
                [affected] = await User.update(
                    { isEnabled: enabled },
                    {
                        where: { idUser: id },
                        transaction: t
                    }
                );

                if (status) {
                    [affected] = await UserRequest.update(
                        { idStatus: status },
                        {
                            where: { idUser: id },
                            transaction: t
                        }
                    );
                }
            });
        } catch (err) {
            throw err;
        }

        return affected === 1
            ? UserRequest.findOne({ where: { idUser: id } })
            : JsonResponse.error(500, "No se actualizo ningun usuario");
    }
    static async getUserbyemail(email: string) {
        const userbyemail = await User.findOne({
            where:{email: email} }) 
            return userbyemail;
        }
    static async userunlock (hourblock: Date | undefined){
        if(!hourblock) {
            return 0;
        }
        const currentTime = new Date();
        const direcenceMs = currentTime.getTime() - hourblock.getTime();
        const differenceMin = direcenceMs / (1000 * 60); // Convert milliseconds to minutes
        const result= 1-differenceMin;

        return result>0? Math.ceil(result): 0;

    }
    static async activacion (user:User,hourblock: Date | undefined,){
        if(user?.getDataValue('isEnabled')==false){
                const locktime= await this.userunlock(hourblock);
                if(locktime>0 ){
                    return JsonResponse.error(403, 'El Usuario esta Bloqueado, intente nuevamente en '+locktime+' minutos');
                }else {
                    await this.putIsEnabled(user.getDataValue('idUser'),true,1);
                    userlock.delete(user.getDataValue('email'));
                    failedattempts.set(user.getDataValue('email'), 0)
                    return ( 'El Usuario ha sido desbloqueado, puede iniciar sesión nuevamente, intente de nuevo por favor.');
                }

    } }
    static async loginUser(email: string, password: string) {
        
        const data = await User.findOne({
            where: {
                email: email,
                password: password
            }
        });
        
        if (data && data.isEnabled) {
              failedattempts.set(email, 0); // Reset the count on successful login
            
            return JsonResponse.success(data, 'Autenticación Exitosa.');
            
        }else{
            const userbyemail = await this.getUserbyemail(email);
            const enabled = userbyemail?.getDataValue('isEnabled');
            if(userbyemail instanceof User && enabled== true){
                const attempts  = failedattempts.get(email) || 0;
        
            if(userbyemail instanceof User  && attempts  < 3){
                
                failedattempts.set(email, attempts  + 1);
                return JsonResponse.error(401, 'Las credenciales no son válidas. Intente nuevamente.'+
                ' attempts  restantes: ' + (3 - attempts ));
            }else if(userbyemail && attempts  >= 3){  
                const iduser= userbyemail.getDataValue('idUser');
                this.putIsEnabled(iduser,false,2);
                userlock.set(email, new Date());
                failedattempts.set(email, 0);
            return JsonResponse.error(400, 'Las credenciales no son válidas, se bloqueo el Usuario.');}
            else if(userbyemail==null){
                failedattempts.set(email, 0);
                return JsonResponse.error(404, 'El usuario no existe.'); }


            }else if(userbyemail instanceof User && enabled== false){
                
                    const hourblock= userlock.get(email);
                const activacion = await this.activacion(userbyemail,hourblock);
                return activacion;
            
            
                

            }else{
                failedattempts.set(email, 0);
                return JsonResponse.error(404, 'El usuario no existe.');
            }
            
        
    }}


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
            return JsonResponse.error(500, "Usuario no registrado");
        }
    }

    static async getUserRequests(idUser: number) {
        const user = await User.findByPk(idUser);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const requests = await UserRequest.findAll({
            where: { idUser: idUser }
        });

        if (requests.length === 0) {
            console.warn('El usuario no tiene solicitudes');
        }

        return requests;
    }
    

    static async updateUser(idUser: number, values: any) {
        try {
            await sequelize.transaction(async (t) => {
                const user = await User.findByPk(idUser);

                if (!user) {
                    throw new Error();
                }

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

                await UserRequest.update(
                    {
                        userName: values.username
                    },
                    {
                        where: { idUser: idUser },
                        transaction: t
                    }
                );

                return JsonResponse.success(User.findByPk(idUser), "Usuario actualizado");
            });
        } catch (err) {
        }

        return JsonResponse.error(500, "No se actualizo ningun usuario");
    }
}

export default UserService;
