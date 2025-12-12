import type { ErrorRequestHandler } from "express";

import express from "express";
import cors from "cors";
import prisma from "./prisma.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/event.route.js";
import adminRoutes from "./routes/admin.route.js";
import orderRoutes from "./routes/order.route.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/admin", adminRoutes);
app.use("/orders", orderRoutes);

// Test route
// app.get("/", (req, res) => {
//   res.send("Viveno backend is running!");
// });

// Multer error handling
const multerErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json({ message: "File too large. Max 5MB allowed." });
  }
  next(err);
};

app.use(multerErrorHandler);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
