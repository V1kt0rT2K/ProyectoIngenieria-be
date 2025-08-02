import { Request, Response} from 'express';
import { formatRequest, badRequestMessage } from '../../utils/requestParams';
import ProductService from '../../services/stock/productService';

export const getAllProducts = async (req: Request, res: Response) => {
    const params = formatRequest(req);
    let page = parseInt(params.page);
    let size = parseInt(params.size);
    let sort = parseInt(params.sort);
    try {
        const result = await ProductService.getAllProducts(page, size, sort);

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
export const searchProduct = async (req: Request, res: Response) => {
    const params = formatRequest(req);
    let page = parseInt(params.page);
    let size = parseInt(params.size);
    let sort = parseInt(params.sort);
    try {
        const result = await ProductService.searchProduct(params.searchParam, page, size, sort);

        res.status(result.getStatus()).json(result);
    } 
    catch (error) {
        console.error('Error al buscar producto:', error);
        return res.status(500).send('Error Interno del Servidor');
    } 
}