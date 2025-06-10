import  express, {Express, Request, Response,NextFunction} from 'express';
import { connectDB, disconnectDB, executeQuery } from './utils/connection';
import {queryResponse} from './utils/queryResponse';
import {requestParams} from './utils/requestParams';

import userRoutes from './routes/userRoutes';

const index = express.Router();

index.use('/user',userRoutes);


export default index;