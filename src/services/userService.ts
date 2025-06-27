import Person from '../models/personModel';
import User from '../models/userModel';
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
}

export default UserService;