import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description cannot exceed 2000 characters"),
  imageUrl: z.url({ message: "Invalid image URL" }).optional(),
  startTime: z.iso.datetime({ message: "Invalid date format" }),
  price: z.coerce
    .number({ message: "Price must be a number" })
    .refine((val) => Number.isFinite(val), "Price must be a number")
    .positive("Price must be positive"),
  locationName: z.string().min(1, "Location name is required"),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventSchema = z.infer<typeof createEventSchema>;
export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
