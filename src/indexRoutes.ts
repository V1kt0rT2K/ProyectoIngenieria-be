import  express from 'express';
import './models/associations';
import assetRoutes from './routes/assetRoutes';
import usersRoutes from './routes/usersRoutes';
import userRolesRoutes from './routes/userRolesRoutes';
import userRequestsRoutes from './routes/userRequestsRoutes';
import authRoutes from './routes/authRoutes';

const index = express.Router();

index.use('/asset', assetRoutes);

index.use('/users', usersRoutes);

index.use('/roles', userRolesRoutes);

index.use('/requests', userRequestsRoutes);

index.use('/auth', authRoutes);

export default index;