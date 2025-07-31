import express from "express";

const router = express.Router();
const path = "/salescheck"

import * as salesCheckController from "../../controllers/sales/salesCheckController";

router.get(`${path}/get/:idSalesCheck`, salesCheckController.getSalesCheckById);
router.get(`${path}/get/type/:idClientType/:page/:size/:sort`, salesCheckController.getAllSalesChecks);
router.get(`${path}/cashier/get/type/:idClientType/:page/:size/:sort`, salesCheckController.getAllSalesChecksForUser);
router.post(`${path}/generate`, salesCheckController.generateSalesCheck);


export default router;