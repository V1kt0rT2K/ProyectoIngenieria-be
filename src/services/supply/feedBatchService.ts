import Feed from "../../models/supplys/feedModel";
import FeedBatch from "../../models/supplys/feedBatchModel";
import JsonResponse from "../../utils/jsonResponse";

class FeedBatchService {

    static async getAll(){
        const data =  await FeedBatch.findAll({
            include: [
                {model: Feed, required: true}
            ]
        });

        if(data.length == 0){
            return JsonResponse.error(400,"No se ha encontrado datos.");
        }

        return JsonResponse.success(data,'La petición fue exitosa.');
    }
}

export default FeedBatchService;