import express from "express";

const router = express.Router();
const path = "/salescheck"

import * as salesCheckController from "../../controllers/sales/salesCheckController";
import { checkUserAction } from "../../utils/permissionService";

router.get(`${path}/get/:idSalesCheck`,checkUserAction, salesCheckController.getSalesCheckById);
router.get(`${path}/cashier/search/:searchParam`,checkUserAction, salesCheckController.searchSalesCheckForUser);
router.get(`${path}/search/:searchParam`,checkUserAction, salesCheckController.searchSalesCheck);
router.get(`${path}/get/type/:idClientType/:page/:size/:sort`,checkUserAction, salesCheckController.getAllSalesChecks);
router.get(`${path}/cashier/get/type/:idClientType/:page/:size/:sort`,checkUserAction, salesCheckController.getAllSalesChecksForUser);
router.post(`${path}/generate`,checkUserAction, salesCheckController.generateSalesCheck);

export default router;