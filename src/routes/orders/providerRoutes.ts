import express from "express";
import * as providerController from "../../controllers/orders/providerController";

const router = express.Router();
const path = "/provider";

router.get(`${path}/get/all/`, providerController.getAllProviders);
router.post(`${path}/create`, providerController.registerProvider);
router.get(`${path}/get/:idProvider`, providerController.getProviderById);
router.put(`${path}/update`, providerController.updateProvider);

export default router;