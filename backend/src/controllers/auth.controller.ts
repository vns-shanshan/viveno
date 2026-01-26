import type { Request, Response } from "express";
import prisma from "../prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { redis } from "../lib/upstashClient.js";

const ACCESS_EXPIRES = "15m"; // JWT access token
const REFRESH_EXPIRES = "7d"; // JWT refresh token
const REFRESH_TTL = 60 * 60 * 24 * 7; // Redis: 7 days in seconds

// --------------------------
// Generate access & refresh
// --------------------------
const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: ACCESS_EXPIRES,
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: REFRESH_EXPIRES,
  });

  return { accessToken, refreshToken };
};

// --------------------------
// Store refresh token in Redis
// --------------------------
const storeRefreshToken = async (userId: string, refreshToken: string) => {
  await redis.set(`refresh_token:${userId}`, refreshToken, { ex: REFRESH_TTL });
};

// --------------------------
// Set httpOnly cookies
// --------------------------
const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

type SignupBody = {
  email?: string;
  password?: string;
  name?: string;
};

type LoginBody = {
  email?: string;
  password?: string;
};

export const signup = async (
  req: Request<{}, unknown, SignupBody>,
  res: Response
) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

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

  // generate tokens
  const { accessToken, refreshToken } = generateTokens(newUser.id);
  await storeRefreshToken(newUser.id, refreshToken);

  setCookies(res, accessToken, refreshToken);

  res
    .status(201)
    .json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      userType: newUser.userType,
    });
};

export const login = async (
  req: Request<{}, unknown, LoginBody>,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // generate tokens
  const { accessToken, refreshToken } = generateTokens(user.id);
  await storeRefreshToken(user.id, refreshToken);

  setCookies(res, accessToken, refreshToken);

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    userType: user.userType,
  });
};

export const logout = async (req: Request, res: Response) => {
  // Logout logic here
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as any;
    await redis.del(`refresh_token:${decoded.userId}`);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logout successful" });
  }

  res.json({ message: "User not logged in." });
};

// --------------------------
// REFRESH TOKEN
// --------------------------
export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!
  ) as any;

  const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

  if (storedToken !== refreshToken) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  // generate new access token
  const newAccessToken = jwt.sign(
    { userId: decoded.userId },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: ACCESS_EXPIRES }
  );

  // update access cookie
  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.json({ message: "Access token refreshed" });
};

export const getMe = async (req: Request, res: Response) => {
  res.json(req.user);
};
