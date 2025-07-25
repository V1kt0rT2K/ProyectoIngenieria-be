import express from "express";
import * as supplyBatchController from "../../controllers/supply/supplyBatchController";

const router = express.Router();
const path = "/batch";

router.get(`${path}/get/all`, supplyBatchController.getAllSupplyBatches);
router.get(`${path}/get/:idSupplyBatch`, supplyBatchController.getSupplyBatchById);
router.get(`${path}/get/type/:idSupplyType`, supplyBatchController.getSupplyBatchesByIdType);

export default router;