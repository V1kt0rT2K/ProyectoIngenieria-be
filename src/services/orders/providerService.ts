import JsonResponse from "../../utils/jsonResponse";
import Provider from "../../models/orders/providerModel";
import { Op, Transaction } from "sequelize";
import { ProviderProps } from "../../utils/interfaces/Interface";
import sequelize from "../../utils/connection";

class ProviderService {
    constructor() { }

    static async getAllProvider() {
        const data = await Provider.findAll();

        if (data.length === 0) {
            return JsonResponse.error(400, "No existen proveedores.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }

    static async createProvider(provider: any, transaction: Transaction) {
        return await Provider.create(provider, { transaction });
    }

    static async registerProvider(form: ProviderProps) {

        try {
            const existing = await Provider.findOne({
                where: {
                    [Op.or]: [
                        { providerContact: form.contact },
                        { RTN: form.rtn }
                    ]
                }
            });

            if (existing) {
                return JsonResponse.error(400, "El correo o RTN que ingresó ya está registrado.");
            }

            let data: any;
            await sequelize.transaction(async (t) => {

                const newProvider = await this.createProvider({
                    providerName: form.name,
                    RTN: form.rtn,
                    providerContact: form.contact,
                    location: form.address
                }, t);

                data = newProvider;

            });
            return JsonResponse.success(data, "Proveedor registrado con éxito.");
        } catch (err) {
            console.log(err);
            return JsonResponse.error(500, "Proveedor no registrado.");
        }
    }

    static async getProviderById(idProvider: number) {
        const data = await Provider.findByPk(idProvider);

        if (!data) {
            return JsonResponse.error(400, "El proveedor no existe.");
        }

        return JsonResponse.success(data, "La petición ha sido un éxito.");
    }

    static async updateProvider(idProvider: number, values: any) {


        console.log(idProvider, values);
        const provider = await Provider.findByPk(idProvider);
        let data = null;

        

        if (!provider) {
            return JsonResponse.error(400, "El proveedor no existe.");
        }

        const existing = await Provider.findOne({
            where: {
                [Op.or]: [
                    { providerContact: values.contact },
                    { RTN: values.rtn }
                ],
                idProvider: { [Op.ne]: idProvider }
            }
        });

        if (existing) {
            return JsonResponse.error(400, "El RTN o correo ya están registrados por otro proveedor.");
        }

        try {
            await sequelize.transaction(async (t) => {

                await Provider.update(
                    {
                        providerName: values.name,
                        RTN: values.rtn,
                        providerContact: values.contact,
                        location: values.address
                    },
                    {
                        where: { idProvider: idProvider },
                        transaction: t
                    }
                );

            });

            data = await Provider.findByPk(idProvider);

            return JsonResponse.success(data, "Proveedor actualizado con éxito.");
        } catch (err) {
            console.log(err);
            return JsonResponse.error(500, "No se actualizó ningún proveedor");
        }
    }


}
export default ProviderService;