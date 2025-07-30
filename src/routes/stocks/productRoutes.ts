import express from "express";

const router = express.Router();
const path = "/product"

import * as productController from "../../controllers/stock/productController";


router.get(`${path}/get/all`, productController.getAll);
router.post(`${path}/create`, productController.createProduct);

export default router;