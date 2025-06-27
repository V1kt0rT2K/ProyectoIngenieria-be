import  express, {Express, Request, Response,NextFunction} from 'express';
import assetRoutes from './routes/assetRoutes';
import usersRoutes from './routes/usersRoutes';
import * as userRolesController from './controllers/userRolesController';

const index = express.Router();

index.use('/asset',assetRoutes);
index.use('/user',usersRoutes);
index.use('/roles', express.Router().get("/get/all", userRolesController.getAllRoles));


export default index;