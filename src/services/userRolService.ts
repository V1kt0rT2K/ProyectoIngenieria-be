import UserRol from '../models/userRolModel';

class UserRolService {
    static async getUserRoles() {
        return UserRol.findAll();
    }
}

export default UserRolService;