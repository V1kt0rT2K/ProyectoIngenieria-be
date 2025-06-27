import { Transaction } from 'sequelize';
import Person from '../models/personModel';

class PersonService {
    constructor(){}

    static async getAll(){
        return Person.findAll();
    }

    static async createPerson(person: {}, transaction: Transaction) {
        return await Person.create(person, { transaction });
    }
}

export default PersonService;