import express from "express";

const router = express.Router();
const path = "/swinebatch"

import * as swineBatchController from "../../controllers/stock/swineBatchController";
import { checkUserAction } from "../../utils/permissionService";

router.get(`${path}/get/all/:page/:size/:short`,checkUserAction, swineBatchController.getAllSwineBatch);
router.get(`${path}/get/stage/:idStage`,checkUserAction, swineBatchController.getSwineBatchByIdStage);
router.get(`${path}/get/:idSwineBatch`,checkUserAction, swineBatchController.getSwineBatchById);
router.post(`${path}/create`,checkUserAction, swineBatchController.createSwineBatch);

export default router;