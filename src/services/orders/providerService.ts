import JsonResponse from "../../utils/jsonResponse";
import Provider from "../../models/orders/providerModel";

class ProviderService {
    constructor() {}

    static async getAllProvider() {
        const data = await Provider.findAll();

        if (data.length === 0) {
            return JsonResponse.error(400, "No existen proveedores.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }

    }
    export default ProviderService;