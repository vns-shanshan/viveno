import express from "express";
import { validate } from "../middleware/validate.js";
import { signupSchema } from "../validators/auth.schema.js";

import {
  signup,
  login,
  logout,
  refreshToken,
  getMe,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

router.get("/me", protectRoute, getMe);

export default router;
