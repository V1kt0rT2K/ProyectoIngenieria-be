import  express, {Express, Request, Response,NextFunction} from 'express';
import userRoutes from './routes/userRoutes';

const index = express.Router();

index.use('/user',userRoutes);


export default index;