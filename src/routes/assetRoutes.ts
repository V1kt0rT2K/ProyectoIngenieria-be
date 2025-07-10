import express from "express";

const router = express.Router();

import * as assetController from '../controllers/assetControllers';


router.get('/status/get/all', assetController.getAllStatus);



export default router;