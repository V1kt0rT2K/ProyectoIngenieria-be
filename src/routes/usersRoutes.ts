import express from "express";
import * as usersController from '../controllers/usersControllers';

const router = express.Router();

router.put('/update', usersController.updateUser);
router.put('/update/status', usersController.updateEnabledStatus);
router.get('/get/all/:page/:size/:sort', usersController.getAllUsers);
router.post('/register', usersController.registerUser);

export default router;