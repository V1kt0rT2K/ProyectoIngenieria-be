import express from "express";

const router = express.Router();
const path = "/vaccinebatch"

import * as vaccineBatchController from "../../controllers/supply/vaccineBatchController";


router.get(`${path}/get/all`, vaccineBatchController.getAll);


export default router;