import express from "express";
import { validate } from "../middleware/validate.js";
import {
  createEventSchema,
  updateEventSchema,
} from "../validators/event.schema.js";
import { upload } from "../middleware/upload.middleware.js";

import {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllEvents);
router.get("/:id", protectRoute, getEvent);
router.post(
  "/",
  protectRoute,
  adminRoute,
  upload.single("image"),
  validate(createEventSchema),
  createEvent
);
router.put(
  "/:id",
  protectRoute,
  adminRoute,
  upload.single("image"),
  validate(updateEventSchema),
  updateEvent
);
router.delete("/:id", protectRoute, adminRoute, deleteEvent);

export default router;
