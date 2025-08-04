import UserRole from "../models/users/userRoleModel";
import JsonResponse from "../utils/jsonResponse";

class PublicService {
    static async getRolesForRegistration() {
        const data = await UserRole.findAll({
            where : {
                show : 1
            }
        });

        if(data.length === 0){
            return JsonResponse.error(400, 'No se han encontrado datos.');
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }
}

export default PublicService;