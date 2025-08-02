import express from "express";

import * as supplyPurcharseController from '../../controllers/orders/supplyPurcharseController';

const router = express.Router();
const path = "/purcharse";

router.get(`${path}/get/all/:page/:size/:sort`, supplyPurcharseController.getAllSupplyPurcharses);
router.get(`${path}/get/status/:idStatus/:page/:size/:sort`, 
    supplyPurcharseController.getAllSupplyPurcharsesByIdStatus);
router.get(`${path}/get/:idSupplyPurcharse`, supplyPurcharseController.getSupplyPurcharseById);
router.post(`${path}/generate`, supplyPurcharseController.generatePurcharse);
router.post(`${path}/entry`, supplyPurcharseController.enterSupplyPurcharse);
router.put(`${path}/update`, supplyPurcharseController.updatePurcharseStatus);

export default router;