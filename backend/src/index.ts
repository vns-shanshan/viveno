import express from "express";
import cors from "cors";
import prisma from "./prisma.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/event.route.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Viveno backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
