import express from "express";
import * as supplyBatchController from "../../controllers/supply/supplyBatchController";

const router = express.Router();
const path = "/batch";

router.get(`${path}/get/all/:page/:size/:sort`, supplyBatchController.getAllSupplyBatches);
router.get(`${path}/get/:idSupplyBatch`, supplyBatchController.getSupplyBatchById);
router.get(`${path}/get/type/:idSupplyType/:page/:size/:sort`, supplyBatchController.getSupplyBatchesByIdType);
router.get(`${path}/get/date/expiration`, supplyBatchController.getSuppbyBatchbyMenorExpirationDate);
router.put(`${path}/update/stock`, supplyBatchController.updateStckSupplyBatch);

export default router;