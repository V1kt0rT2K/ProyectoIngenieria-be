import Person from '../models/personModel';
import User from '../models/userModel';
import UserRequest from '../models/userRequestModel';
var count =0;
class UserService {
    constructor() {}

    async getAll() {
        console.log(User.findAll);
        return User.findAll();
    }
    async putisEnabled(idUser: number, isEnabled: boolean) {
        const user = await User.findByPk(idUser);
        if (user instanceof User) {
            user.setDataValue('isEnabled', isEnabled);
            await user.save();
            return user;
        } else {
            throw new Error('Usuario no encontrado');
        }
    }
    
    async loginUser(email: string, password: string) {

        const login = await User.findOne({
            where: {
                email: email,
                password: password
            }
        });
        if (login == null) {
            throw new Error('Usuario o contraseña incorrectos');
        } else {
            console.log('Usuario logueado correctamente');
            console.log(login.getDataValue('idUser'));
            console.log(login instanceof User);

        }
    }

    async createUser(user: {}, person: {}) {
        const newPerson = await Person.create(person);
        const newUser = await User.create({...user, ...{ personId: newPerson.idPerson }});
        return newUser;
    }

    async getUserRequests(idUser: number){
        const user = await User.findByPk(idUser);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const requests = await UserRequest.findAll({
            where: {idUser: idUser}
        });

        if (requests.length === 0) {
            console.warn('El usuario no tiene solicitudes');
        }

        return requests;
    }
}

export default UserService;