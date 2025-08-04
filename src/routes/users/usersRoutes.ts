import express from "express";
import * as usersController from '../../controllers/users/usersControllers';
import { checkUserAction } from "../../utils/permissionService";

const router = express.Router();

router.put('/update/:id',checkUserAction, usersController.updateUser);
router.put('/update/status',checkUserAction, usersController.updateEnabledStatus);
router.get('/get/all/:page/:size/:sort',checkUserAction, usersController.getAllUsers);
router.get('/:id',checkUserAction, usersController.getUserById);
router.get('/search/:searchParam',checkUserAction, usersController.searchUsers);

export default router;
