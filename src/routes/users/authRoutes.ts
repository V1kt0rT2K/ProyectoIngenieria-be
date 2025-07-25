import express from "express";
import * as authController from '../../controllers/users/authControllers';

import { verifyTokenTest } from "../../utils/jwtService";

const router = express.Router();

router.post('/login', authController.loginUser);
router.post('/token/test', verifyTokenTest);

export default router;