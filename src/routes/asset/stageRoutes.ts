import express from "express";

const router = express.Router();

import * as statusController from '../../controllers/asset/stageController';
import { checkUserAction } from "../../utils/permissionService";


router.get('/stage/get/all',checkUserAction, statusController.getAllStages);
router.get('/stage/get/:idStage',checkUserAction, statusController.getStageById);



export default router;