import type { Request, Response, NextFunction } from "express";

type AppError = Error & { statusCode?: number; status?: number };

export function globalErrorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err); // log full error for debugging

  const status = err.statusCode ?? err.status ?? 500;
  const message = err.message ?? "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
    // optionally details in non-prod environments:
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}
