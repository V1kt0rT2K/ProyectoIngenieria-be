import  express, {Express, Request, Response} from 'express';
import User from '../models/userModel';
var count =0;
class UserService {
    constructor(){}

    async getAll(){
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
    
    const login =await  User.findOne({
            where:{
                email: email,
                password: password
            }
        });
        
        if (login==null){
        
            const validemail=await User.findOne({
                where:{
                    email: email
                }
            });
            if (validemail instanceof User){
                if (count < 3){
                    count++;
                    console.log('Contraseña incorrecta, intentos restantes: ' + (3 - count)); }
                    else{  
                    this.putisEnabled(validemail.getDataValue('idUser'), false);
                        console.log('Usuario bloqueado por demasiados intentos fallidos');
                    }
            }
                else{
                    count=0;
                console.log('El email no existe');}
            
        }else{
            
            console.log('Usuario logueado correctamente');
            console.log(login.getDataValue('idUser'));
            console.log(login instanceof User);
            
            return 'login exitoso';
            
        }

        }               
}

export default UserService;