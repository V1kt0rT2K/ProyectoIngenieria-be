import express from "express";

const router = express.Router();
const path = "/code";

import * as caiCodeController from "../../controllers/sales/caiCodeController";

router.post(`${path}/generate`, caiCodeController.generateNewRange);
router.get(`${path}/get/active/:isActive/:page/:size/:sort`, caiCodeController.getAllRangesByActiveStatus);

export default router;