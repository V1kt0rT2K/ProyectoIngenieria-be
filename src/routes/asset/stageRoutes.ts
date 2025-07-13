import express from "express";

const router = express.Router();

import * as statusController from '../../controllers/asset/stageController';


router.get('/stage/get/all', statusController.getAllStages);



export default router;