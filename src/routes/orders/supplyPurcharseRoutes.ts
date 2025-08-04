import express from "express";

import * as supplyPurcharseController from '../../controllers/orders/supplyPurcharseController';
import { checkUserAction } from "../../utils/permissionService";

const router = express.Router();
const path = "/purcharse";

router.get(`${path}/get/all/:page/:size/:sort`,checkUserAction, supplyPurcharseController.getAllSupplyPurcharses);
router.get(`${path}/get/status/:idStatus/:page/:size/:sort`,checkUserAction, 
    supplyPurcharseController.getAllSupplyPurcharsesByIdStatus);
router.get(`${path}/get/:idSupplyPurcharse`,checkUserAction, supplyPurcharseController.getSupplyPurcharseById);
router.post(`${path}/generate`,checkUserAction, supplyPurcharseController.generatePurcharse);
router.post(`${path}/entry`,checkUserAction, supplyPurcharseController.enterSupplyPurcharse);
router.put(`${path}/update`,checkUserAction, supplyPurcharseController.updatePurcharseStatus);
router.put(`${path}/manage`,checkUserAction, supplyPurcharseController.approveOrRejectSupplyPurcharse);

export default router;