import express from "express";

const router = express.Router();
const path = "/product"

import * as productController from "../../controllers/stock/productController";


router.get(`${path}/get/all/:page/:size/:sort`, productController.getAllProducts);
router.get(`${path}/search/:searchParam/:page/:size/:sort`, productController.searchProduct);
router.post(`${path}/create`, productController.createProduct);

export default router;