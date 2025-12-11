import express from "express";
import { validate } from "../middleware/validate.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { createOrderSchema } from "../validators/order.schema.js";

import {
  createOrder,
  getMyOrders,
  getOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protectRoute, validate(createOrderSchema), createOrder);
router.get("/", protectRoute, getMyOrders);
router.get("/:id", protectRoute, getOrder);

export default router;
