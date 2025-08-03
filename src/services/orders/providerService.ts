import JsonResponse from "../../utils/jsonResponse";
import Provider from "../../models/orders/providerModel";
import { Op, Transaction } from "sequelize";
import { ProviderProps } from "../../utils/interfaces/Interface";
import sequelize from "../../utils/connection";

class ProviderService {

    // static async getAllProvider(page: number, size: number, sort: number) {

    //     if (page <= 0) {
    //         page = 1;
    //     }
    //     if (size <= 0) {
    //         size = 5;
    //     }
    //     if (sort != 0 && sort != 1) {
    //         sort = 0;
    //     }

    //     const { count, rows } = await Provider.findAndCountAll({
    //         where: {
    //             isEnabled: 1
    //         },
    //         order: [
    //             ["providerName", sort == 0 ? "DESC" : "ASC"]
    //         ],
    //         offset: (page - 1) * size,
    //         limit: size
    //     });

    //     if (rows.length == 0) {
    //         return JsonResponse.error(400, "No se han encontrado datos");
    //     }
    //     return JsonResponse.success(
    //         { data: rows, totalItems: count },
    //         "La petición ha sido un éxito."
    //     );
    // }

    static async getAllProvider(page: number, size: number, sort: number, enabled?: number) {

    if (page <= 0) {
        page = 1
    };
    if (size <= 0) {
        size = 5
    };
    if (sort != 0 && sort != 1) {
        sort = 0
    };

    const whereCondition: any = {};

    if (enabled === 0 || enabled === 1) {
        whereCondition.isEnabled = enabled;
    }

    const { count, rows } = await Provider.findAndCountAll({
        where: whereCondition, 
        order: [
            ["providerName", sort === 0 ? "DESC" : "ASC"]
        ],
        offset: (page - 1) * size,
        limit: size
    });

    if (rows.length === 0) {
        return JsonResponse.error(400, "No se han encontrado datos");
    }

    return JsonResponse.success(
        { data: rows, totalItems: count },
        "La petición ha sido un éxito."
    );
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

    static async deleteProvider(idProvider: number) {
        const provider = await Provider.findByPk(idProvider);

        if (!provider) {
            return JsonResponse.error(400, "El proveedor no existe.");
        }

        try {
            await provider.update({ isEnabled: 0 });
            return JsonResponse.success(provider, "Proveedor inhabilitado con éxito")
        } catch (error) {
            console.error("Error al inhabilitar al proveedor", error);
            return JsonResponse.error(500, "No se pudo inhabilitar el proveedor")
        }
    }

    static async searchProvider(searchParam: string) {

        const providers = await Provider.findAll({
            where: {
                [Op.or]: [
                    { providerName: { [Op.like]: searchParam + "%" } },
                    { RTN: { [Op.like]: searchParam + "%" } },
                    { providerContact: { [Op.like]: searchParam + "%" } }
                ]
            }
        });

        if (providers.length == 0) {
            return JsonResponse.error(400, "No se han encontrado proveedores.");
        }

        return JsonResponse.success(providers, 'La petición se ha respondido con éxito.');
    }

    static async updateEnabledStatus(idProvider: number, enabled: boolean) {
        const provider = await Provider.findByPk(idProvider);

        if (!provider) {
            return JsonResponse.error(400, "El proveedor no existe.");
        }

        try {
            await sequelize.transaction(async (t) => {
                await Provider.update(
                    { isEnabled: enabled },
                    {
                        where: { idProvider },
                        transaction: t
                    }
                );
            });

            return JsonResponse.success({}, "El proveedor ha sido actualizado con éxito.");
        } catch (err) {
            console.error(err);
            return JsonResponse.error(500, "Ha ocurrido un error.");
        }
    }


}
export default ProviderService;
