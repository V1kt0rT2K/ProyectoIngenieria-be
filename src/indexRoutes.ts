import  express from 'express';
import './models/associations';
import assetRoutes from './routes/asset/assetRoutes';
import usersRoutes from './routes/users/usersRoutes';
import userRolesRoutes from './routes/users/userRolesRoutes';
import userRequestsRoutes from './routes/users/userRequestsRoutes';
import authRoutes from './routes/users/authRoutes';

const index = express.Router();

index.use('/asset', assetRoutes);

index.use('/users', usersRoutes);

index.use('/roles', userRolesRoutes);

index.use('/requests', userRequestsRoutes);

index.use('/auth', authRoutes);

export default index;