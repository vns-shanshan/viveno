import { z } from "zod";

export const createOrderSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  quantity: z.int().positive("Quantity must be at least 1").default(1),
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;
