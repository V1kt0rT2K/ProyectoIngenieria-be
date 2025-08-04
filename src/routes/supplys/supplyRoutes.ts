import express from "express";
import * as supplyController from "../../controllers/supply/supplyController";
import { checkUserAction } from "../../utils/permissionService";

const router = express.Router();

router.get(`/get/all`,checkUserAction, supplyController.getAllSupplies);
router.get(`/get/:idSupply`,checkUserAction, supplyController.getSupplyById);
router.get(`/get/type/:idSupplyType`,checkUserAction, supplyController.getSupplyByType);
router.get(`/get/stage/:idStage`,checkUserAction, supplyController.getSupplyByStage);

export default router;