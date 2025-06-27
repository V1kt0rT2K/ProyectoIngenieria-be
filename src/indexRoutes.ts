import  express from 'express';
import assetRoutes from './routes/assetRoutes';
import usersRoutes from './routes/usersRoutes';
import userRolesRoutes from './routes/userRolesRoutes';

const index = express.Router();

index.use('/asset', assetRoutes);

index.use('/user', usersRoutes);

index.use('/roles', userRolesRoutes);

export default index;