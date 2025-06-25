import  express, {Express, Request, Response} from 'express';
import Status from '../models/statusModel';

class StatusService {
    constructor(){}

    async getAll(){
        console.log(Status.findAll);
        return Status.findAll();
    }
}

export default StatusService;