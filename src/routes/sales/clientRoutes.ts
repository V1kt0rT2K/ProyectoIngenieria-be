import express from "express";

const router = express.Router();
const path = "/client"

import * as clientController from "../../controllers/sales/clientController";

router.get(`${path}/get/types`, clientController.getClientTypes);


export default router;