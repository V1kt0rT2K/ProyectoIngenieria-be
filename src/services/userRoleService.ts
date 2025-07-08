import User from '../models/userModel';
import UserRolesHistoric from '../models/userRolesHistoricModel';
import UserRole from '../models/userRoleModel';
import sequelize from '../utils/connection';
import JsonResponse from '../utils/jsonResponse';

class UserRoleService {
    static async getUserRoles() {
        const data = await UserRole.findAll();

        if(data.length === 0){
            return JsonResponse.error(400, 'No se han encontrado datos.');
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }

    static async updateUserRole(idUser: number, newRoleId: number, description?: string) {
        try {
            await sequelize.transaction(async (t) => {
                
                //Manejo de Errores
                const user = await User.findByPk(idUser, { transaction: t });
                if (!user) {
                    return JsonResponse.error(400,"El usuario no existe.");
                }

                const role = await UserRole.findByPk(newRoleId);
                if(!role){
                    return JsonResponse.error(400,"El rol seleccionado no es válido.");
                }

                const oldRoleId = user.idRole;

                // Actualizar rol
                await User.update(
                    { idRole: newRoleId },
                    { where: { idUser }, transaction: t }
                );

                // Insertar historial
                await UserRolesHistoric.create(
                    {
                        idUser: idUser,
                        oldRoleId: oldRoleId,
                        newRoleId: newRoleId,
                        description: description ?? "Cambio de rol realizado"
                    },
                    { transaction: t }
                );
            });

            return JsonResponse.success({},'La actualización se ha realizado con éxito.');
        } catch (err) {
            console.error(err);
            return JsonResponse.error(500, "No se pudo actualizar el rol.");
        }
        //const updatedUser = await User.findByPk(idUser);
    }

}

export default UserRoleService;