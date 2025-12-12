import type { Request, Response } from "express";
import prisma from "../prisma.js";
import type { CreateEventSchema } from "../validators/event.schema.js";

type EventParams = {
  id: string;
};

export const getAllEvents = async (req: Request, res: Response) => {
  const now = new Date();

  const events = await prisma.event.findMany({
    where: {
      startTime: {
        gt: now,
      }, // Only future events
    },
  });

  res.json({ events });
};

export const getEvent = async (req: Request<EventParams>, res: Response) => {
  const { id } = req.params;

  const event = await prisma.event.findUnique({
    where: { id },
  });
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json({ event });
};
