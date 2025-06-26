import express,{ Express } from "express";

const router = express.Router();

import * as usersController from '../controllers/usersControllers';


router.get('/get/all', usersController.getAllUsers);



export default router;