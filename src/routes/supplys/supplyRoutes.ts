import express from "express";
import * as supplyController from "../../controllers/supply/supplyController";

const router = express.Router();

router.get(`/get/all`, supplyController.getAllSupplies);
router.get(`/get/:idSupply`, supplyController.getSupplyById);
router.get(`/get/type/:idSupplyType`, supplyController.getSupplyByType);

export default router;