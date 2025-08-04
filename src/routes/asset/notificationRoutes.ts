import express from "express";

const router = express.Router();
import * as notificationController from '../../controllers/asset/notificationController';
import { checkUserAction } from "../../utils/permissionService";

const path = "/notification";

router.put(`${path}`,checkUserAction, notificationController.checkNotification);
router.get(`${path}/get/all`,checkUserAction, notificationController.getAllNotificationsForUser);

export default router;