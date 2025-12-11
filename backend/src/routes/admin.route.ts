import express from "express";
import { validate } from "../middleware/validate.js";
import {
  createEventSchema,
  updateEventSchema,
} from "../validators/event.schema.js";
import { upload } from "../middleware/upload.middleware.js";

import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

import {
  getAllOrders,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/orders", protectRoute, adminRoute, getAllOrders);
router.post(
  "/events",
  protectRoute,
  adminRoute,
  upload.single("image"),
  validate(createEventSchema),
  createEvent
);
router.put(
  "/events/:id",
  protectRoute,
  adminRoute,
  upload.single("image"),
  validate(updateEventSchema),
  updateEvent
);
router.delete("/events/:id", protectRoute, adminRoute, deleteEvent);

export default router;
