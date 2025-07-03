import express from "express";

const router = express.Router();

import * as usersController from '../controllers/usersControllers';

router.put('/update/:id', usersController.updateUser);

router.put('/put/status', usersController.putIsEnabled);

router.get('/get/all', usersController.getAllUsers);

router.get('/:id/requests', usersController.getUserRequests);

router.post('/login', usersController.loginUser);

router.post('/register', usersController.registerUser);

export default router;