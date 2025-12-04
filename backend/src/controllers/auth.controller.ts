import type { Request, Response } from "express";
import prisma from "../prisma.js";
import bcrypt from "bcryptjs";

type SignupBody = {
  email?: string;
  password?: string;
  name?: string;
};

export const signup = async (
  req: Request<{}, unknown, SignupBody>,
  res: Response
) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    res
      .status(201)
      .json({ id: newUser.id, email: newUser.email, name: newUser.name });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    console.log("Error in signup controller:", message);
    res.status(500).json({ message });
  }
};

export const login = async (req: Request, res: Response) => {
  // Login logic here
};

export const logout = async (req: Request, res: Response) => {
  // Logout logic here
};
