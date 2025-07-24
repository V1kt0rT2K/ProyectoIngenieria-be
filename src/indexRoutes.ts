import  express from 'express';
import './models/associations';
import statusRoutes from './routes/asset/statusRoutes';
import usersRoutes from './routes/users/usersRoutes';
import userRolesRoutes from './routes/users/userRolesRoutes';
import userRequestsRoutes from './routes/users/userRequestsRoutes';
import authRoutes from './routes/users/authRoutes';
import stageRoutes from './routes/asset/stageRoutes';
import swineBatchRoutes from './routes/stocks/swineBatchRoutes';
import productRoutes from './routes/stocks/productRoutes';
import supplyRouter from './routes/supplys/supplyRouter';
import swineSuppliesRoutes from './routes/supplys/swineSuppliesRouter';

import salesCheckRoutes from './routes/sales/salesCheckRoutes';

const index = express.Router();

index.use('/asset', 
    statusRoutes, stageRoutes);

index.use('/users', usersRoutes);

index.use('/roles', userRolesRoutes);

index.use('/requests', userRequestsRoutes);

index.use('/auth', authRoutes);

index.use('/stock', 
    swineBatchRoutes, productRoutes);

index.use('/supply', supplyRouter,swineSuppliesRoutes);

index.use('/sales', salesCheckRoutes);

export default index;