import express,{ Express } from "express";

const router = express.Router();

import * as userController from '../controllers/userControllers';


router.get('/get/all', userController.getAllUsers);
router.post('/save', userController.saveUser);



export default router;