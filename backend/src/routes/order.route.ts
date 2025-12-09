import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createOrder,
  getMyOrders,
  getOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

// add a createOrder zod schema and validate middleware later
router.post("/", protectRoute, createOrder);
router.get("/", protectRoute, getMyOrders);
router.get("/:id", getOrder);

export default router;
