import express from "express";

const router = express.Router();

import * as userRolesController from '../controllers/userRolesController';

router.get("/get/all", userRolesController.getAllRoles);
router.put("/update", userRolesController.updateUserRole);

export default router;