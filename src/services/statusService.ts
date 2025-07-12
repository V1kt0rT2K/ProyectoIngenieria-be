import  express, {Express, Request, Response} from 'express';
import Status from '../models/assets/statusModel';
import JsonResponse from '../utils/jsonResponse';

class StatusService {
    constructor(){}

    async getAll(){
        const data =  await Status.findAll();
        return JsonResponse.success(data,'La petición fue exitosa.');
    }
}

export default StatusService;