import ClientType from "../../models/sales/clientTypeModel";
import Client from "../../models/sales/clientModel";
import JsonResponse from "../../utils/jsonResponse";


class ClientService{

    static async getClientTypes(){

        const data = await ClientType.findAll();

        if(!data)
            return JsonResponse.error(400,"No se han encontrado datos.");

        return JsonResponse.success(data, "La petición se ha realizado con éxito.");

    }

    static async getClients(page: number, size: number, sort: number) {
        if(page <=0){
            page = 1;
        }
        if(size <= 0){
            size = 15;
        }
        if(sort != 0 && sort != 1){
            sort = 0;
        }

				const totalItems = await Client.count();

        const data = await Client.findAll({
            order:[
                ["fullName", sort == 0 ? "DESC" : "ASC"]
            ],
            offset: (page-1) * size,
            limit: size
				});

        if(!data)
            return JsonResponse.error(400,"No se han encontrado datos.");

        return JsonResponse.success({data: data, totalItems: totalItems}, "La petición se ha realizado con éxito.");

    }

}

export default ClientService;
