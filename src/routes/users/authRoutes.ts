import express from "express";
import * as authController from '../../controllers/users/authControllers'

const router = express.Router();

router.post('/login', authController.loginUser);

export default router;