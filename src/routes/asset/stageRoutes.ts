import express from "express";

const router = express.Router();

import * as statusController from '../../controllers/asset/stageController';


router.get('/stage/get/all', statusController.getAllStages);
router.get('/stage/get/:idStage', statusController.getStageById);



export default router;