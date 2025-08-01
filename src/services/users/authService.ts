import UserService from '../users/userService';
import User from '../../models/users/userModel';
import JsonResponse from '../../utils/jsonResponse';

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
        
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if(!user)
            return JsonResponse.error(400,"Credenciales inválidas.");

        let lockTime = lockedUsers.get(email);
        if(lockTime){
            const remainingTime = this.getRemainingTime(lockTime);
            if(remainingTime > 0){
                return JsonResponse.error(403,"Muchos intentos fallidos, intente de nuevo en unos minutos.");
            }else{
                if(user.password == password){
                    failedAttempts.delete(email);
                    lockedUsers.delete(email);
                    return JsonResponse.success(user,"La petición se ha realizado con éxito.");
                }else{
                    lockedUsers.set(email, new Date());
                    return JsonResponse.error(403,"Muchos intentos fallidos, intente de nuevo en unos minutos.");
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
}

export default AuthService;