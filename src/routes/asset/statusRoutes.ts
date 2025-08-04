import express from "express";

const router = express.Router();

import * as statusController from '../../controllers/asset/statusController';
const path = '/status'

router.get(`${path}/get/all`, statusController.getAllStatus);
router.get(`${path}/get/purcharses`, statusController.getStatusForPurcharses);
router.get(`${path}/get/requests`, statusController.getStatusForUserRequests);
router.get(`${path}/get/type/:idStatusType`, statusController.getStatusByIdStatusType);



export default router;