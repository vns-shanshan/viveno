import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";

export const validate =
  (schema: z.Schema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? "Invalid input";
      return res.status(400).json({ message: firstError });
    }

    req.body = result.data;
    next();
  };
