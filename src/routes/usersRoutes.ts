import express,{ Express } from "express";

const router = express.Router();

import * as usersController from '../controllers/usersControllers';

router.get('/get/all', usersController.getAllUsers);

router.get('/:id/requests', usersController.getUserRequests);


router.post('/login', usersController.loginUser);

router.post('/create', usersController.createUser);

export default router;