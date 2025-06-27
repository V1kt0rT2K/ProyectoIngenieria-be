import Person from '../models/personModel';
import User from '../models/userModel';
import PersonService from './personService';
import UserRequestService from './userRequestService';
import type { UserProps, PersonProps } from '../interfaces/Interface';

var count = 0;

class UserService {
    constructor() {}

    static async getAll() {
        console.log(User.findAll);
        return User.findAll();
    }

    static async putisEnabled(idUser: number, isEnabled: boolean) {
        const user = await User.findByPk(idUser);
        if (user instanceof User) {
            user.setDataValue('isEnabled', isEnabled);
            await user.save();
            return user;
        } else {
            throw new Error('Usuario no encontrado');
        }
    }
    
    static async loginUser(email: string, password: string) {
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

    static async createUser(user: {}) {
        return await User.create(user);
    }

    static async registerUser(user: UserProps, person: PersonProps) {
        const newPerson = await PersonService.createPerson(person);

        const userName = user.username ?? "";
        delete user.username;

        const newUser = await this.createUser({...user, ...{ idPerson: newPerson.idPerson }});

        const newRequest = await UserRequestService.createRequest(newUser, userName);

        return newUser;
    }
}

export default UserService;