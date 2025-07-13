import express from "express";

const router = express.Router();

import * as statusController from '../../controllers/asset/statusController';


router.get('/status/get/all', statusController.getAllStatus);



export default router;