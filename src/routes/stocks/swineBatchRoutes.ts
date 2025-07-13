import express from "express";

const router = express.Router();
const path = "/swinebatch"

import * as swineBatchController from "../../controllers/stock/swineBatchController";


router.get(`${path}/get/all`, swineBatchController.getAll);
router.get(`${path}/get/stage/:idStage`, swineBatchController.getSwineBatchByIdStage);
router.get(`${path}/get/:idSwineBatch`, swineBatchController.getSwineBatchById);
router.get(`${path}/medicalrecord/get/:idSwineBatch`, swineBatchController.getMedicalRecordById);


export default router;