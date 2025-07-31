import ClientType from "../../models/sales/clientTypeModel";
import JsonResponse from "../../utils/jsonResponse";


class ClientService{

    static async getClientTypes(){

        const data = await ClientType.findAll();

        if(!data)
            return JsonResponse.error(400,"No se han encontrado datos.");

        return JsonResponse.success(data, "La petición se ha realizado con éxito.");

    }

}

export default ClientService;