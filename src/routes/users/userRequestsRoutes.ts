import express from "express";

const router = express.Router();

import * as usersRequestsController from "../../controllers/usersRequestsController";

router.get('/get/all/:page/:size/:sort', usersRequestsController.getAllRequests);
router.get('/get/user/:idUser', usersRequestsController.getUserRequestsByIdUser);
router.get('/get/:idUserRequest', usersRequestsController.getUserRequestById);
router.get('/get/status/:idStatus/:page/:size/:sort', usersRequestsController.getUserRequestsByIdStatus);
router.put('/manage',usersRequestsController.manageUserRequest);

export default router;