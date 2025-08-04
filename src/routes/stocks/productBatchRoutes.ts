import express from "express";

import * as productBatchController from "../../controllers/stock/productBatchController";
import { checkUserAction } from "../../utils/permissionService";

const router = express.Router();
const path = "/product/batch";

router.get(`${path}/get/all/:page/:size/:sort`,checkUserAction, productBatchController.getAllProductBatches);
router.post(`${path}/create`,checkUserAction, productBatchController.createProductBatch);
router.get(`${path}/search/:searchParam/:page/:size/:sort`,checkUserAction, productBatchController.searchProductBatch);

export default router;