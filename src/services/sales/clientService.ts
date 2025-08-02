import ClientType from "../../models/sales/clientTypeModel";
import Client from "../../models/sales/clientModel";
import JsonResponse from "../../utils/jsonResponse";
import { ClientProps } from "../../utils/interfaces/Interface";
import { Op, Transaction } from "sequelize";
import sequelize from "../../utils/connection";

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

        const {count , rows} = await Client.findAndCountAll({
            order:[
                ["fullName", sort == 0 ? "DESC" : "ASC"]
            ],
            offset: (page-1) * size,
            limit: size
			});

        if(!rows)
            return JsonResponse.error(400,"No se han encontrado datos.");

        return JsonResponse.success({data: rows, totalItems: count}, "La petición se ha realizado con éxito.");

    }

    static async createClient(client: any, transaction: Transaction) {
        return await Client.create(client, { transaction });
    }

    static async registerClient(form: ClientProps) {

        try {
            const existing = await Client.findOne({
                where: {
                    [Op.or]: [
                        { identification: form.identification }
                    ]
                }
            });

            if (existing) {
                return JsonResponse.error(400, "El numero de identidad que ingresó ya está registrado.");
            }

            let data: any;
            await sequelize.transaction(async (t) => {
                const newClient = await this.createClient({
                    identification: form.identification,
                    fullName: form.fullName,
                    contact: form.contact,
                    address: form.address,
										idClientType: form.idClientType,
                }, t);

                data = newClient;

            });
            return JsonResponse.success(data, "Proveedor registrado con éxito.");
        } catch (err) {
            console.log(err);
            return JsonResponse.error(500, "Proveedor no registrado.");
        }
    }

}

export default ClientService;
