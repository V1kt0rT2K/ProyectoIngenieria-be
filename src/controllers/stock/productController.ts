import { Request, Response} from 'express';
import { formatRequest, badRequestMessage } from '../../utils/requestParams';
import ProductService from '../../services/stock/productService';

export const getAll = async (req: Request, res: Response) => {

    try {
        const result = await ProductService.getAll();

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 

}
export const createProduct = async (req: Request, res: Response) => {
    try {
        const params = formatRequest(req);

        const result = await ProductService.createProduct(params);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 
}