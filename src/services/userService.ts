import  express, {Express, Request, Response} from 'express';
import User from '../models/userModel';

class UserService {
    constructor(){}

    async getAll(){
        console.log(User.findAll);
        return User.findAll();
    }
    async loginUser(email: string, password: string) {
        
    const login =await  User.findOne({
            where:{
                email: email,
                password: password
            }
        });
        if (login==null){
            throw new Error('Usuario o contraseña incorrectos');
        }else{
            console.log('Usuario logueado correctamente');
            console.log(login instanceof User);
            
        }

        }               
}

export default UserService;