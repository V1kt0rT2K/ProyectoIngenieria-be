import express from "express";

const router = express.Router();
const path = "/salescheck"

import * as salesCheckController from "../../controllers/sales/salesCheckController";


router.get(`${path}/get/all`, salesCheckController.getAll);
router.post(`${path}/generate`, salesCheckController.generateSalesCheck);


export default router;