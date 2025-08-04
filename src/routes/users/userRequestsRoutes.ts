import express from "express";

const router = express.Router();
const path = '/requests';

import * as usersRequestsController from "../../controllers/users/usersRequestsController";
import { checkUserAction } from "../../utils/permissionService";

router.get(`${path}/get/all/:page/:size/:sort`,checkUserAction, usersRequestsController.getAllRequests);
router.get(`${path}/get/user/:idUser`,checkUserAction, usersRequestsController.getUserRequestsByIdUser);
router.get(`${path}/get/:idUserRequest`,checkUserAction, usersRequestsController.getUserRequestById);
router.get(`${path}/get/status/:idStatus/:page/:size/:sort`,checkUserAction, usersRequestsController.getUserRequestsByIdStatus);
router.put(`${path}/manage`,checkUserAction,usersRequestsController.manageUserRequest);

export default router;