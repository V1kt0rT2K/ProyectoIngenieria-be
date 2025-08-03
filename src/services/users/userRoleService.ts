import User from '../../models/users/userModel';
import UserRolesHistoric from '../../models/users/userRolesHistoricModel';
import UserRole from '../../models/users/userRoleModel';
import sequelize from '../../utils/connection';
import JsonResponse from '../../utils/jsonResponse';
import { UpdateRoleProp } from '../../utils/interfaces/Interface';

class UserRoleService {

    static async getUserRolesForAdmin() {
        const data = await UserRole.findAll();

        if(data.length === 0){
            return JsonResponse.error(400, 'No se han encontrado datos.');
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }

    static async updateUserRole(updateRoleProp : UpdateRoleProp) {
        try {
            await sequelize.transaction(async (t) => {
                
                //Manejo de Errores
                const user = await User.findByPk(updateRoleProp.idUser, { transaction: t });
                if (!user) {
                    return JsonResponse.error(400,"El usuario no existe.");
                }

                const role = await UserRole.findByPk(updateRoleProp.idRole, { transaction : t});
                if(!role){
                    return JsonResponse.error(400,"El rol seleccionado no es válido.");
                }

                const oldRoleId = user.idRole;

                // Actualizar rol
                await User.update({ 
                    idRole: updateRoleProp.idRole 
                },{ 
                    where: {
                        idUser : updateRoleProp.idUser
                    }, 
                    transaction: t 
                }
                );

                // Insertar historial
                await UserRolesHistoric.create(
                    {
                        idUser: updateRoleProp.idUser,
                        oldRoleId: oldRoleId,
                        newRoleId: updateRoleProp.idRole,
                        description: updateRoleProp.description ?? "Cambio de rol realizado"
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