// src/middleware/auth.middleware.ts
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

interface JwtPayload {
  userId: string;
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No access token provided" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!
      ) as JwtPayload;

      // Fetch user from DB (no password)
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          userType: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Attach user to request object
      (req as any).user = user;

      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Access token expired" });
      }
      throw error;
    }
  } catch (error: any) {
    console.log("Error in protectRoute middleware:", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid access token" });
  }
};

// ----------------------------------------------------
// Admin-only route middleware
// ----------------------------------------------------
export const adminRoute = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (user && user.userType === "ADMIN") {
    return next();
  }

  return res.status(403).json({ message: "Access denied - Admin only" });
};
