import express from "express";

const router = express.Router();
const path = "/swinebatch"

import * as swineBatchController from "../../controllers/stock/swineBatchController";


router.get(`${path}/get/all/:page/:size/:short`, swineBatchController.getAll);
router.get(`${path}/get/stage/:idStage`, swineBatchController.getSwineBatchByIdStage);
router.get(`${path}/get/:idSwineBatch`, swineBatchController.getSwineBatchById);
router.post(`${path}/create`, swineBatchController.createSwineBatch);
router.put(`${path}/update/stockquantity`, swineBatchController.updateStockQuantiy);


export default router;