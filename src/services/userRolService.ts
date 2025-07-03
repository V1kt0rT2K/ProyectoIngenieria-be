import User from '../models/userModel';
import UserRolesHistoric from '../models/userRolesHistoricModel';
import UserRol from '../models/userRolModel';
import sequelize from '../utils/connection';
import JsonResponse from '../utils/jsonResponse';

class UserRolService {
    static async getUserRoles() {
        return UserRol.findAll();
    }

    static async updateUserRole(idUser: number, newRoleId: number, description?: string) {
    try {
        await sequelize.transaction(async (t) => {
            // Obtener usuario

             
            const user = await User.findByPk(idUser, { transaction: t });
            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            const oldRoleId = user.idRole;

            // Actualizar rol
            await User.update(
                { idRole: newRoleId },
                { where: { idUser }, transaction: t }
            );


            console.log(new Date().toISOString());
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

            // Devolver usuario actualizado

//            return JsonResponse.success(updatedUser, "Rol actualizado y registrado en historial");
        });
    } catch (err) {
        console.error(err);
        return JsonResponse.error(500, "No se pudo actualizar el rol");
    }
    const updatedUser = await User.findByPk(idUser);

    return JsonResponse.success(updatedUser,'Error');
}

}

export default UserRolService;