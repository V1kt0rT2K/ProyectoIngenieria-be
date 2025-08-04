import express from "express";

import * as swineSupplyController from "../../controllers/supply/swineSupliesController";
import { checkUserAction } from "../../utils/permissionService";

const path = "/swinesupply";
const router = express.Router();

router.get(`${path}/get/all/swine`,checkUserAction, swineSupplyController.getAllSwineSupply); 
router.get(`${path}/get/all/swine/:idSwineBatch`,checkUserAction, swineSupplyController.getAllSwineSupplybyidSwineBatch);
router.post(`${path}/create`,checkUserAction, swineSupplyController.createSwineSupply);

export default router;