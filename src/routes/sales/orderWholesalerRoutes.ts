import express from "express";

const router = express.Router();
const path = "/orders"

import * as orderWholeSalerController from "../../controllers/sales/orderWholesalerController";

router.get(`${path}/get/all/:page/:size/:sort`, orderWholeSalerController.getOrdersWholesaler);

export default router;