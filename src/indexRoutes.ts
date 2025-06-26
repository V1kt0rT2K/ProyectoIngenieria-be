import  express, {Express, Request, Response,NextFunction} from 'express';
import assetRoutes from './routes/assetRoutes';
import usersRoutes from './routes/usersRoutes';

const index = express.Router();

index.use('/asset',assetRoutes);
index.use('/user',usersRoutes);


export default index;