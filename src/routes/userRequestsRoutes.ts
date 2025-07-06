import express from "express";

const router = express.Router();

import * as usersRequestsController from "../controllers/usersRequestsController";

router.get('/get/all', usersRequestsController.getAllRequests);
router.get('/get/user/:idUser', usersRequestsController.getUserRequestsByIdUser);

export default router;