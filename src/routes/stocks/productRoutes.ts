import express from "express";

const router = express.Router();
const path = "/product"

import * as productController from "../../controllers/stock/productController";
import { checkUserAction } from "../../utils/permissionService";

router.get(`${path}/get/all/:page/:size/:sort`,checkUserAction, productController.getAllProducts);
router.get(`${path}/search/:searchParam/:page/:size/:sort`,checkUserAction, productController.searchProduct);
router.post(`${path}/create`,checkUserAction, productController.createProduct);

export default router;