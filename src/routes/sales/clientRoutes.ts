import express from "express";

const router = express.Router();
const path = "/client"

import * as clientController from "../../controllers/sales/clientController";

router.get(`${path}/get/types`, clientController.getClientTypes);

router.get(`${path}/get/all/:page/:size/:sort`, clientController.getClients);

router.post(`${path}/create`, clientController.registerClient);

export default router;
