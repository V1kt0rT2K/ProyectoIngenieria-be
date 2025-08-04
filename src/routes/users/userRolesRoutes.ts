import express from "express";

const router = express.Router();

import * as userRolesController from '../../controllers/users/userRolesController';
import { checkUserAction } from "../../utils/permissionService";
const path = '/roles';

router.get(`${path}/get/all`,checkUserAction, userRolesController.getAllRolesForAdmin);
router.put(`${path}/update`,checkUserAction, userRolesController.updateUserRole);

export default router;