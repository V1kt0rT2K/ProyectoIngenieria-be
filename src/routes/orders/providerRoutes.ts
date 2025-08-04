import express from "express";
import * as providerController from "../../controllers/orders/providerController";
import { checkUserAction } from "../../utils/permissionService";

const router = express.Router();
const path = "/provider";

router.get(`${path}/get/all/:isEnabled/:page/:size/:sort`,checkUserAction, providerController.getAllProviders);
router.post(`${path}/create`,checkUserAction, providerController.registerProvider);
router.get(`${path}/get/:idProvider`,checkUserAction, providerController.getProviderById);
router.put(`${path}/update`,checkUserAction, providerController.updateProvider);
router.put(`${path}/update/status`,checkUserAction, providerController.updateProviderEnabledStatus);
router.put(`${path}/delete`,checkUserAction, providerController.deleteProvider);
router.get(`${path}/search/:searchParam`,checkUserAction, providerController.searchProvider);

export default router;