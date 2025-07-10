import UserService from './userService';
import User from '../models/users/userModel';
import JsonResponse from '../utils/jsonResponse';

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

        return result > 0? Math.ceil(result): 0;

    }

    static async loginUser(email: string, password: string) {
        
        const data = await User.findOne({
            where: {
                email: email,
                password: password
            }
        });
        
        if (data && data.isEnabled) {
            failedAttempts.set(email, 0); // Reset the count on successful login
            return JsonResponse.success(data, 'Autenticación Exitosa.');
            
        }else{
            const UserByEmail = await User.findOne({
                where: {email:email}
            });

            if(!UserByEmail){
                failedAttempts.set(email, 0);
                return JsonResponse.error(400, 'El usuario no existe.'); 
            }

            if(UserByEmail.isEnabled){
                const attempts  = failedAttempts.get(email) || 0;
            
                if(attempts  < 3){
                    
                    failedAttempts.set(email, attempts  + 1);
                    return JsonResponse.error(401, 'Las credenciales no son válidas. Intente nuevamente.'+
                    ' intentos  restantes: ' + (3 - attempts ));
                }else{  
                    UserService.updateEnabledStatus(UserByEmail.idUser, false);
                    lockedUsers.set(email, new Date());
                    failedAttempts.set(email, 0);
                    return JsonResponse.error(400, 'Las credenciales no son válidas, se bloqueo el Usuario.');
                }
            }else{
                const lockTime = lockedUsers.get(email);
                const remainingTime = this.getRemainingTime(lockTime);
                if(remainingTime > 0){
                    return JsonResponse.error(403, 'El Usuario esta Bloqueado, intente nuevamente en '+remainingTime+' minutos');
                }else {
                    await UserService.updateEnabledStatus(UserByEmail.idUser,true);
                    lockedUsers.delete(UserByEmail.email);
                    failedAttempts.set(UserByEmail.email, 0);
                    return JsonResponse.success({},'El Usuario ha sido desbloqueado, puede iniciar sesión nuevamente, intente de nuevo por favor.');
                }
            }
        }
    }
}

export default AuthService;