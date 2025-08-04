import UserService from '../users/userService';
import User from '../../models/users/userModel';
import JsonResponse from '../../utils/jsonResponse';
import UserRequestService from './userRequestService';
import Person from '../../models/users/personModel';
import UserRole from '../../models/users/userRoleModel';
import sequelize from '../../utils/connection';
import UserRequest from '../../models/users/userRequestModel';
import { RegisterFormProps } from '../../utils/interfaces/Interface';
import NotificationService from '../asset/notificationService';

const failedAttempts= new Map<string, number>();
const lockedUsers = new Map<string, Date>(); 

class AuthService {
    constructor(){};

    private static getRemainingTime (lockTime: Date | undefined){
        if(!lockTime) {
            return 0;
        }
        const currentTime = new Date();
        const direcenceMs = currentTime.getTime() - lockTime.getTime();
        const differenceMin = direcenceMs / (1000 * 60); // Convert milliseconds to minutes
        const result= 1-differenceMin;

        
        console.log("currenTTIme",currentTime);
        console.log("diferences",differenceMin);

        return result > 0? Math.ceil(result): 0;

    }

    static async loginUser(email: string, password: string) {
        
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if(!user)
            return JsonResponse.error(400,"Credenciales inválidas.");

        if(!(user.isEnabled)  && user.password == password)
            return JsonResponse.error(400,"El usuario no esta habilitado.");

        let lockTime = lockedUsers.get(email);
        if(lockTime){
            const remainingTime = this.getRemainingTime(lockTime);
            console.log("reamining TIme",remainingTime);
            if(remainingTime > 0){
                return JsonResponse.error(403,"Muchos intentos fallidos, intente de nuevo en unos minutos.");
            }else{
                if(user.password == password){
                    failedAttempts.delete(email);
                    lockedUsers.delete(email);
                    return JsonResponse.success(user,"La petición se ha realizado con éxito.");
                }else{
                    //lockedUsers.set(email, new Date());
                    return JsonResponse.error(403,"Credenciales Inválidas.");
                }
                
            }
        }

        if(user.password != password){
            let attempts = failedAttempts.get(email) || 0;
            attempts++;
            failedAttempts.set(email,attempts);

            if(attempts >= 3){
                lockedUsers.set(email, new Date());
                return JsonResponse.error(403,"Muchos intentos fallidos, intente de nuevo en unos minutos.");
            }
            return JsonResponse.error(403,"Credenciales inválidas");
        }

        failedAttempts.delete(email);
        lockedUsers.delete(email);
        return JsonResponse.success(user,"La petición se ha realizado con éxito.");
    }

    static async registerUser(form: RegisterFormProps) {

        const user = await User.findOne({
            where : {
                email : form.email
            }
        });

        const request = await UserRequest.findOne({
            include : [
                {model : User, required:true}
            ],
            where : {
                '$User.email$' : form.email
            }
        });

        if(request?.idStatus == 2)
            return JsonResponse.error(500,"Aún no se ha gestionado su solicitud de usuario.");

        if(user)
            return JsonResponse.error(500,"Ya existe un usuario con las credenciales ingresadas.");

        try {
            await sequelize.transaction(async (t) => {
                const roleName = (await UserRole.findByPk(form.idRole))!.roleName;

                const newPerson = await Person.create({
                    firstName: form.firstName,
                    secondName: form.secondName,
                    lastName: form.lastName,
                    secondLastName: form.secondLastName,
                    identityNumber: form.identityNumber
                }, {
                    transaction: t
                });

                const newUser = await User.create({
                    email: form.email,
                    job: form.job ?? roleName,
                    password: form.password,
                    idPerson: newPerson.idPerson,
                    idRole: form.idRole
                }, {
                    transaction: t
                });

                const newRequest = await UserRequest.create({
                    idUser: newUser.idUser,
                    idRole: form.idRole,
                    idStatus: 2,
                    userName: form.username,
                    email: form.email,
                    //job: form.job ?? "CCCCC"
                    job: form.job ?? roleName
                }, {
                    transaction: t
                });

                await NotificationService.sendNotificationByRole( 1,
                    "Se ha registrado una nueva solicitud de usuario.",
                    t
                );
            });

            
            return JsonResponse.success({},"Usuario registrado con éxito.");
        } catch (err) {
            console.log(err);
            return JsonResponse.error(500, "Usuario no registrado.");
        }
    }

}

export default AuthService;