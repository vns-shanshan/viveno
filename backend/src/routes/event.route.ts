import express from "express";

import { getAllEvents, getEvent } from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllEvents);
router.get("/:id", protectRoute, getEvent);

export default router;
