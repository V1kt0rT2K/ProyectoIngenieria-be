import express from "express";
import * as providerController from "../../controllers/orders/providerController";

const router = express.Router();
const path = "/provider";

router.get(`${path}/get/all/:page/:size/:sort`, providerController.getAllProviders);
router.post(`${path}/create`, providerController.registerProvider);
router.get(`${path}/get/:idProvider`, providerController.getProviderById);
router.put(`${path}/update`, providerController.updateProvider);
router.put(`${path}/update/status`, providerController.updateEnabledStatus);
router.put(`${path}/delete`, providerController.deleteProvider);
router.get(`${path}/search/:searchParam`, providerController.searchProvider);

export default router;