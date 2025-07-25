import express from "express";
import * as providerController from "../../controllers/orders/providerController";
const router = express.Router();
const path = "/provider";
router.get(`${path}/get/all/`, providerController.getAllProviders);
export default router;