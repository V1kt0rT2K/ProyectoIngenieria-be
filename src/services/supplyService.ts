import  express, {Express, Request, Response} from 'express';
import FeedBatches from'../models/supplys/feedBatcheModel';
import VaccineBatch from '../models/supplys/vaccineBatchModel';
import JsonResponse from '../utils/jsonResponse';
import e from 'express';

class supplyService {
    constructor(){}

    async getAllFeed(){
        const data =  await FeedBatches.findAll();
        return JsonResponse.success(data,'La petición fue exitosa.');
    }
    async getAllVaccine(){
        const data =  await VaccineBatch.findAll();
        return JsonResponse.success(data,'La petición fue exitosa.');
    }
    async getByType(type: string) {
    let data;

    switch (type.toLowerCase()) {
        case 'feed':
            data = await FeedBatches.findAll();
            break;
        case 'vaccine':
            data = await VaccineBatch.findAll();
            break;
        default:
            return JsonResponse.error(400, "Tipo de insumo no válido.");
    }

    return JsonResponse.success(data, `Lotes de tipo '${type}' obtenidos correctamente.`);
}

}
export default supplyService;