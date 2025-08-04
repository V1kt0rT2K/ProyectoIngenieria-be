import express from "express";

const router = express.Router();

const path = "/orders"

import * as orderWholeSalerController from "../../controllers/sales/orderWholesalerController";
import { checkUserAction } from "../../utils/permissionService";

router.get(`${path}/get/all/:page/:size/:sort`, orderWholeSalerController.getOrdersWholesaler);
router.get(`${path}/get/:idOrderWholesaler`, orderWholeSalerController.getOrderWholesalerById);

export default router;