import express from "express";

const router = express.Router();

import * as userRolesController from '../controllers/userRolesController';

router.get("/get/all", userRolesController.getAllRoles);

router.put("/updateRole", userRolesController.updateUserRole);

export default router;