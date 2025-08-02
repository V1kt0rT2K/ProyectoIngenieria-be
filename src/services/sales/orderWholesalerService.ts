import OrderWholesaler from "../../models/sales/orderWholesalerModel";
import Status from "../../models/assets/statusModel";
import JsonResponse from "../../utils/jsonResponse";
import Client from "../../models/sales/clientModel";
import OrderWholesalerDetails from "../../models/sales/orderWholesalerDetailsModel";

class OrderWholesalerService {
    static async getAll(page: number, size: number, sort: number) {
        if (page <= 0) {
            page = 1;
        }
        if (size <= 0) {
            size = 15;
        }
        if (sort != 0 && sort != 1) {
            sort = 0;
        }

        const { count, rows } = await OrderWholesaler.findAndCountAll({
            include: [
                { model: Status, required: true }
            ],
            order: [
                ["generationDate", sort == 0 ? "DESC" : "ASC"]
            ],
            distinct: true,
            offset: (page - 1) * size,
            limit: size
        });

        console.log(count);

        if (rows.length == 0) {
            return JsonResponse.error(400, "No se han encontrado datos.");
        }

        return JsonResponse.success({ data: rows, totalItems: count }, "La petición ha sido un éxito.");
    }

    static async getOrderWholesalerById(idOrderWholesaler: number) {
        const data = await OrderWholesalerDetails.findOne({
            where: {
                idOrderWholesaler: idOrderWholesaler
            },
            include: [
                {
                    model: OrderWholesaler, required: true, include: [
                        { model: Client, required: true },
                        { model: Status, required: true }
                    ]
                }
            ]
        });

        if (!data)
            return JsonResponse.error(400, "No se han encontrado datos.");

        return JsonResponse.success(data, "La petición se ha realizado con éxito.");
    }
}

export default OrderWholesalerService;
