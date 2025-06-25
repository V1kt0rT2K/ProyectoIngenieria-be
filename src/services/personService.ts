import  express, {Express, Request, Response} from 'express';
import person from '../models/personModel';

class personService {
    constructor(){}

    async getAll(){
        console.log(person.findAll);
        return person.findAll();
    }
}

export default personService;