import express from "express";

const router = express.Router();
const path = "/code";

import * as caiCodeController from "../../controllers/sales/caiCodeController";
import { checkUserAction } from "../../utils/permissionService";

router.post(`${path}/generate`,checkUserAction, caiCodeController.generateNewRange);
router.get(`${path}/get/active/:isActive/:page/:size/:sort`,checkUserAction, caiCodeController.getAllRangesByActiveStatus);

export default router;