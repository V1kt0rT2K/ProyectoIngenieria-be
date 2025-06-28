import express from "express";

const router = express.Router();

import * as usersRequestsController from "../controllers/usersRequestsController";

router.get('/get/all', usersRequestsController.getAllRequests);

export default router;