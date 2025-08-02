import express from "express";
import * as usersController from '../../controllers/users/usersControllers';
import { checkUserAction } from "../../utils/permissionService";

const router = express.Router();

router.put('/update/:id', usersController.updateUser);
router.put('/update/status', usersController.updateEnabledStatus);
router.get('/get/all/:page/:size/:sort', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.get('/search/:searchParam', usersController.searchUsers);
router.post('/register', usersController.registerUser);

export default router;
