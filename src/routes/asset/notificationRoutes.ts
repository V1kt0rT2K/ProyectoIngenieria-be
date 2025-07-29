import express from "express";

const router = express.Router();
import * as notificationController from '../../controllers/asset/notificationController';

const path = "/notification";

router.put(`${path}`, notificationController.checkNotification);
router.get(`${path}/get/all`, notificationController.getAllNotificationsForUser);

export default router;