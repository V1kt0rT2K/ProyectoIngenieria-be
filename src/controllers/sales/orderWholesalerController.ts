import { Request, Response } from 'express';
import OrderWholesalerService from "../../services/sales/orderWholesalerService";
import { formatRequest } from "../../utils/requestParams";

export const getOrdersWholesaler = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let page = parseInt(params.page);
        let size = parseInt(params.size);
        let sort = parseInt(params.sort);

        const result = await OrderWholesalerService.getAll(page, size, sort);
        res.status(result.getStatus()).json(result);
    }
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}

export const getOrderWholesalerById = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);
        let idOrderWholesaler = parseInt(params.idOrderWholesaler);

        const result = await OrderWholesalerService.getOrderWholesalerById(idOrderWholesaler);

        res.status(result.getStatus()).json(result);
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    }
}
