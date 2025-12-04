import express from "express";
import cors from "cors";
import prisma from "./prisma.js";

import authRoutes from "./routes/auth.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Viveno backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
