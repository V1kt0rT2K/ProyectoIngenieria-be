import express from "express";
import * as swineSupplyController from "../../controllers/supply/swineSupliesController";
const path = "/swinesupply";
const router = express.Router();
router.get(`${path}/get/all/swine`, swineSupplyController.getAllSwineSupply); 
export default router;