import express from "express";
import * as supplyBatchController from "../../controllers/supply/supplyBatchController";
import { checkUserAction } from "../../utils/permissionService";

const router = express.Router();
const path = "/batch";

router.get(`${path}/get/all/:page/:size/:sort`,checkUserAction, supplyBatchController.getAllSupplyBatches);
router.get(`${path}/get/:idSupplyBatch`,checkUserAction, supplyBatchController.getSupplyBatchById);
router.get(`${path}/get/type/:idSupplyType/:page/:size/:sort`,checkUserAction, supplyBatchController.getSupplyBatchesByIdType);
router.get(`${path}/get/date/expiration`,checkUserAction, supplyBatchController.getSupplyBatchesNearExpiration);
router.put(`${path}/update/stock`,checkUserAction, supplyBatchController.updateStckSupplyBatch);
router.get(`${path}/search/:searchParam/:page/:size/:sort`,checkUserAction,supplyBatchController.searchSupplyBatch);
router.get(`${path}/type/search/:idSupplyType/:searchParam/:page/:size/:sort`,checkUserAction,supplyBatchController.searchSupplyBatchByType);

export default router;