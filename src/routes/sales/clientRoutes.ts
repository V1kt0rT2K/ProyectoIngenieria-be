import express from "express";

const router = express.Router();
const path = "/client"

import * as clientController from "../../controllers/sales/clientController";
import { checkUserAction } from "../../utils/permissionService";

router.get(`${path}/get/types`,checkUserAction, clientController.getClientTypes);
router.get(`${path}/get/all/:page/:size/:sort`,checkUserAction, clientController.getClients);
router.get(`${path}/search/:searchParam`,checkUserAction, clientController.searchClients);
router.post(`${path}/create`,checkUserAction, clientController.registerClient);

export default router;
