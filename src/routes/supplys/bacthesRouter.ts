import express from "express";

const router = express.Router();

import { getBatchesByType } from "../../controllers/supplyControllers";


router.get('/batches/:type', getBatchesByType);



export default router;