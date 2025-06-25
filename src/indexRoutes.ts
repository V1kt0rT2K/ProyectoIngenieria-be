import  express, {Express, Request, Response,NextFunction} from 'express';
//import userRoutes from './routes/userRoutes';
import assetRoutes from './routes/assetRoutes';

const index = express.Router();

//index.use('/user',userRoutes);
index.use('/asset',assetRoutes);


export default index;