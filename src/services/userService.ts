import  express, {Express, Request, Response} from 'express';
import User from '../models/userModel';

class UserService {
    constructor(){}

    async getAll(){
        console.log(User.findAll);
        return User.findAll();
    }
}

export default UserService;