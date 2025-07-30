import express from "express";
import * as productBatchController from "../../controllers/stock/productBatchController";
const router = express.Router();
const path = "/product/batch";
router.get(`${path}/get/all`, productBatchController.getAllProductBatches);
router.post(`${path}/create`, productBatchController.createProductBatch);
export default router;