import express from "express";

const router = express.Router();
const path = "/feedbatch"

import * as feedBatchController from "../../controllers/supply/feedBatchController";


router.get(`${path}/get/all`, feedBatchController.getAll);


export default router;