import express from "express";
import * as swineSupplyController from "../../controllers/supply/swineSupliesController";
const path = "/swinesupply";
const router = express.Router();
router.get(`${path}/get/all/swine`, swineSupplyController.getAllSwineSupply); 
router.get(`${path}/get/all/swine/:idSwineBatch`, swineSupplyController.getAllSwineSupplybyidSwineBatch);
router.post(`${path}/create`, swineSupplyController.createSwineSupply);
export default router;