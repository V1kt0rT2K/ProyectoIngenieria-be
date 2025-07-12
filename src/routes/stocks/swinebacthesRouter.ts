import express from "express";

const router = express.Router();

import { getAllswineBatch,getSwineBatchById,getSwineBatchByStage, getSwinesByBatch } from "../../controllers/stockControllers";


router.get('/batches/Swines', getAllswineBatch);
router.get('/batches/Swines/stage/:idStage', getSwineBatchByStage);
router.get('/batches/Swines/:idSwineBatch', getSwineBatchById);
router.get('/batches/Swines/:idSwineBatch/swines', getSwinesByBatch);



export default router;