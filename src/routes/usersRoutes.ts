import express,{ Express } from "express";

const router = express.Router();

import * as usersController from '../controllers/usersControllers';

router.get('/get/all', usersController.getAllUsers);




router.post('/login', usersController.loginUser);

router.post('/register', usersController.registerUser);

export default router;