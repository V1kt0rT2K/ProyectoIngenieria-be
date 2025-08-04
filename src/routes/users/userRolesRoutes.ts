import express from "express";

const router = express.Router();

import * as userRolesController from '../../controllers/users/userRolesController';
const path = '/roles';

router.get(`${path}/get/all`, userRolesController.getAllRolesForAdmin);
router.put(`${path}/update`, userRolesController.updateUserRole);

export default router;