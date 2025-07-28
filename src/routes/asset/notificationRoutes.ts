import express from "express";

const router = express.Router();
import * as notificationController from '../../controllers/asset/notificationController';

router.put('/notification', notificationController.checkNotification);
router.get('/notification/get/all', notificationController.getAllNotificationsForUser);

export default router;