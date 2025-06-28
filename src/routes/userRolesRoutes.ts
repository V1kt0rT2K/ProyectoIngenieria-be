import express from "express";

const router = express.Router();

import * as userRolesController from '../controllers/userRolesController';

router.get("/get/all", userRolesController.getAllRoles);

export default router;