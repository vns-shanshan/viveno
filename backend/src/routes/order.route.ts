import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createOrder,
  getMyOrders,
  getOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", protectRoute, getMyOrders);
router.get("/:id", getOrder);

export default router;
