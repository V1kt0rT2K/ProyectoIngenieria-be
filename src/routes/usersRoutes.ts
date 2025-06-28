import express from "express";

const router = express.Router();

import * as usersController from '../controllers/usersControllers';

router.get('/get/all', usersController.getAllUsers);

router.get('/:id/requests', usersController.getUserRequests);

router.post('/login', usersController.loginUser);

router.post('/register', usersController.registerUser);

router.put('/:idUser/status', usersController.updateUserStatus);

export default router;