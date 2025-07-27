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
import supplyRoutes from './routes/supplys/supplyRoutes';
import swineSuppliesRoutes from './routes/supplys/swineSuppliesRoutes';
import salesCheckRoutes from './routes/sales/salesCheckRoutes';
import supplyBatchRoutes from './routes/supplys/supplyBatchRoutes';
import providerRoutes from './routes/orders/providerRoutes';
import productBatchRoutes from './routes/stocks/productBatchRoutes';


import { verifyToken } from './utils/jwtService';

const index = express.Router();

index.use('/auth', authRoutes);

index.use('/roles', userRolesRoutes);

index.use(verifyToken);
//index.use(checkUserAction);

index.use('/users', usersRoutes);

index.use('/asset', 
    statusRoutes, stageRoutes);

index.use('/requests', userRequestsRoutes);

index.use('/stock', 
    swineBatchRoutes, productRoutes,productBatchRoutes);

index.use('/supply', supplyRoutes,swineSuppliesRoutes,supplyRoutes,supplyBatchRoutes);

index.use('/sales', salesCheckRoutes);

index.use('/order',providerRoutes);

export default index;