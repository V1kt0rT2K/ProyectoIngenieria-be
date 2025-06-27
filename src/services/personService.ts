import Person from '../models/personModel';

class PersonService {
    constructor(){}

    static async getAll(){
        return Person.findAll();
    }

    static async createPerson(person: {}) {
        return await Person.create(person);
    }
}

export default PersonService;