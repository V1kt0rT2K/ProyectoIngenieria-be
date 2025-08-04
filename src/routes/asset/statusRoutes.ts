import express from "express";

const router = express.Router();

import * as statusController from '../../controllers/asset/statusController';
import { checkUserAction } from "../../utils/permissionService";
const path = '/status'

router.get(`${path}/get/all`,checkUserAction, statusController.getAllStatus);
router.get(`${path}/get/purcharses`,checkUserAction, statusController.getStatusForPurcharses);
router.get(`${path}/get/requests`,checkUserAction, statusController.getStatusForUserRequests);
router.get(`${path}/get/type/:idStatusType`,checkUserAction, statusController.getStatusByIdStatusType);



export default router;