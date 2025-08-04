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
import notificationRoutes from './routes/asset/notificationRoutes';
import supplyPurcharseRoutes from './routes/orders/supplyPurcharseRoutes';
import clientRoutes from './routes/sales/clientRoutes';
import orderWholesalerRoutes from './routes/sales/orderWholesalerRoutes';
import caiCodeRoutes from './routes/sales/caiCodeRoutes';
import publicRoutes from './routes/publicRoutes';

import { verifyToken } from './utils/jwtService';

const index = express.Router();

index.use('/auth', authRoutes);

index.use('/public', publicRoutes);

index.use(verifyToken);

index.use('/users', usersRoutes, userRolesRoutes, userRequestsRoutes);

index.use('/asset', 
    statusRoutes, stageRoutes, notificationRoutes);

index.use('/stock', 
    swineBatchRoutes, productRoutes,productBatchRoutes);

index.use('/supply', supplyRoutes,swineSuppliesRoutes,supplyRoutes,supplyBatchRoutes);

index.use('/sales', salesCheckRoutes, clientRoutes, orderWholesalerRoutes, caiCodeRoutes);

index.use('/order',providerRoutes, supplyPurcharseRoutes);

export default index;